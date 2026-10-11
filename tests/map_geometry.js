const fs = require('fs');
const vm = require('vm');
const path = require('path');
const root = path.resolve(__dirname, '..');
const names = ['New South Wales','Victoria','Queensland','Western Australia','South Australia','Tasmania','Northern Territory'];
const features = names.map((name,i) => ({type:'Feature', properties:{STATE_NAME:name},geometry:{type:'Polygon',coordinates:[i%2 ? [[0,0],[0,1],[1,1],[1,0],[0,0]] : [[0,0],[1,0],[1,1],[0,1],[0,0]]]}}));
const emitted=[];
const context={console,Promise,Set,Error,Array,Object,document:{getElementById:()=>({textContent:''})},
fetch:async url=>({ok:true,json:async()=>url.includes('states.min.geojson')?{type:'FeatureCollection',features}:JSON.parse(fs.readFileSync(path.join(root,url),'utf8'))}),
vegaEmbed:async (target,spec)=>{emitted.push({target,spec})}};
vm.runInNewContext(fs.readFileSync(path.join(root,'main.js'),'utf8'),context);
setTimeout(()=>{
 const maps=emitted.filter(x=>x.target.startsWith('#map-'));
 if(emitted.length!==14||maps.length!==4)throw Error(`Only ${emitted.length} charts and ${maps.length} maps`);
 const rings=[];for(const {spec} of maps){let nodes=spec.layer||[spec];for(const n of nodes)if(n.data?.values?.[0]?.geometry)rings.push(...n.data.values.map(f=>f.geometry.coordinates[0]));}
 if(rings.length!==28)throw Error(`Only ${rings.length} prepared rings`);
 const area=r=>r.slice(1).reduce((a,p,i)=>a+(r[i][0]*p[1]-p[0]*r[i][1]),0);
 if(rings.some(r=>area(r)>=0))throw Error('Exterior ring still counterclockwise');
 console.log('Verified 14 embeds, all four maps use seven clockwise state polygons; joins covered.');
},100);
