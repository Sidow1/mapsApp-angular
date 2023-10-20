import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapsRoutingModule } from './maps-routing.module';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { MapsLayoutComponent } from './layout/maps-layout/maps-layout.component';
import { FullScreenPageComponent } from './pages/full-screen-page/full-screen-page.component';
import { MarkersPageComponent } from './pages/markers-page/markers-page.component';
import { PropertiesPageComponent } from './pages/properties-page/properties-page.component';
import { ZoomRangePageComponent } from './pages/zoom-range-page/zoom-range-page.component';

import * as mapboxgl from 'mapbox-gl';
import { MiniMapComponent } from './components/mini-map/mini-map.component';

(mapboxgl as any).accessToken =
  'pk.eyJ1Ijoic2lkb3ciLCJhIjoiY2xueHR0NDFhMGlhYjJscGN2NGtteXZscSJ9.fz445Je8By3wTenFYaTgPw';

@NgModule({
  declarations: [
    SideMenuComponent,
    MapsLayoutComponent,
    FullScreenPageComponent,
    MarkersPageComponent,
    PropertiesPageComponent,
    ZoomRangePageComponent,
    MiniMapComponent,
  ],
  imports: [CommonModule, MapsRoutingModule],
})
export class MapsModule {}
