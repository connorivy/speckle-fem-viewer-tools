import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import FilteringManager from './js/overrideFilteringManager';


export function pluginMain(v, store) {
  initGui(v)
  v.sceneManager.sceneObjects.filteringManager = new FilteringManager(v)
}


function initGui(v) {
  v.gui = new GUI();

  const param = {
    // 'fixed nodes': true,
    // 'wind direction': 1,
    'wireframe' : true,
    'color by' : null,
    'direction' : 1,
    'deform' : 0,
  };

  v.gui.add( param, 'wireframe' ).onChange( function ( val ) {
    console.log('wireframe')
    v.applyFilter({filterBy: {'speckle_type': 'SpeckMesh'}, wireframe: val })
    v.applyFilter(null)
  } );

  v.gui.add( param, 'color by', { 'none': null, 'applied loads': 'applied_loads', 'displacement': 'displacements', 'reactions': 'reactions' } ).onChange( function ( val ) {
    console.log(this)
    v.applyFilter({filterBy: {'speckle_type': 'SpeckMesh'}, colorBy: {property: val, direction: this.object['direction'], type: 'FEM'} })
    v.applyFilter(null)
  } );

  v.gui.add( param, 'direction', { 'Magnitude': 2, 'X': 0, 'Y': 1 } ).onChange( function ( val ) {
    v.applyFilter({filterBy: {'speckle_type': 'SpeckMesh'}, colorBy: {property: this.object['color by'], direction: val, type: 'FEM'} })
    v.applyFilter(null)
  } );

  v.gui.add( param, 'deform', 0, 5000 ).onChange( function ( val ) {
    if (!val) v.applyFilter(null)
    else v.applyFilter({filterBy: {'speckle_type': 'SpeckMesh'}, showDeformed: val, ghostOthers: true })
  } );
}