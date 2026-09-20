"""Copy five training displays from processed Zarr fields; never reconstruct from raw.

Usage: python export_processed_training.py PRIVATE_MANIFEST TACTILE_DATA_JS
Manifest rows: name, source (Zarr directory), key (processed array field).
Keep the manifest private: it may contain identifying source paths.
"""
import itertools
import json
from pathlib import Path
import sys
import numpy as np
from numcodecs import Blosc, Zstd

FIELDS = {
    'box-robot-demo': 'tactile_right_delta',
    'cup-human-demo': 'tactile_left',
    'cup-robot-demo': 'tactile_left_delta',
    'plug-human-demo': 'tactile_left',
    'plug-robot-demo': 'tactile_left_delta',
}

def read_array(path):
    meta = json.loads((path / 'zarr.json').read_text())
    shape = meta['shape']
    chunk = meta['chunk_grid']['configuration']['chunk_shape']
    codecs = [c['name'] for c in meta['codecs']]
    assert codecs in [['bytes', 'blosc'], ['bytes', 'zstd']]
    result = np.zeros(shape, dtype=meta['data_type'])
    decoder = Blosc() if codecs[1] == 'blosc' else Zstd()
    for index in itertools.product(*(range((s+c-1)//c) for s,c in zip(shape,chunk))):
        file = path / 'c'
        for i in index:
            file /= str(i)
        values = np.frombuffer(decoder.decode(file.read_bytes()), dtype=result.dtype).reshape(chunk)
        region = tuple(slice(i*c,min((i+1)*c,s)) for i,c,s in zip(index,chunk,shape))
        result[region] = values[tuple(slice(0,r.stop-r.start) for r in region)]
    return result

def main():
    manifest = json.loads(Path(sys.argv[1]).read_text())
    target = Path(sys.argv[2])
    data = json.loads(target.read_text().split('=',1)[1].rstrip(';\n'))
    selected = [r for r in manifest if r['name'] in FIELDS]
    assert len(selected) == len(FIELDS) and {r['name'] for r in selected} == set(FIELDS)
    for row in selected:
        name = row['name']
        source = Path(row['source'])
        assert row['key'] == FIELDS[name]
        attrs = json.loads((source/'zarr.json').read_text())['attributes']
        assert attrs['tactile_preprocessing'] == 'expnorm' and attrs['tactile_clip'] is True
        values = read_array(source/'data'/row['key'])
        clip = data['clips'][name]
        assert values.shape == (len(clip['values']),202)
        assert np.isfinite(values).all() and values.min() >= 0 and values.max() <= 1
        exported = np.round(values.astype(float),6).tolist()
        unchanged = exported == clip['values']
        clip['values'] = exported
        clip['processing'] = {
            'source_stage': 'post_clip',
            'source_field': row['key'],
            'baseline': attrs.get('tactile_baseline_source','first_30_frames'),
            'additional_signal_processing': 'none',
            'additional_rescalings': 0,
            'serialization_decimal_places': 6,
        }
        print(f'{name}: copied processed field; values unchanged={unchanged}')
    target.write_text('window.SOTA_TACTILE='+json.dumps(data,separators=(',',':'))+';\n')

if __name__ == '__main__':
    main()
