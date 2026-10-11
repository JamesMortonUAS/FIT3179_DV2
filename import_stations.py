"""Make a small, clearly scoped point dataset from Geoscience Australia's GeoJSON."""
import json,sys,pathlib,collections
root=pathlib.Path(__file__).parent
src=sys.argv[1] if len(sys.argv)>1 else '../upload/Major_Power_Stations.geojson'
features=json.load(open(src))['features'];rows=[]
for f in features:
 p=f['properties'];cap=p.get('generation_capacity_mw')
 if p.get('status')!='Operational' or not isinstance(cap,(int,float)) or cap<100:continue
 fuel=p.get('primary_fuel_type')
 if fuel is None:continue
 rows.append({'name':p['feature_name'],'fuel':fuel,'capacity_mw':cap,'state':p['state'],'longitude':p['longitude'],'latitude':p['latitude']})
(root/'data'/'major-stations-100mw.json').write_text(json.dumps(rows,separators=(',',':')))
print(len(rows),'operational stations ≥100 MW',collections.Counter(r['fuel'] for r in rows))
