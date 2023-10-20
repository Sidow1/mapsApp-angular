import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

interface MarkerAndColor {
  marker: Marker;
  color: string;
}

interface PlainMarker {
  lngLat: number[];
  color: string;
}

@Component({
  selector: 'app-markers-page',
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css'],
})
export class MarkersPageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('map') divMap?: ElementRef;

  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-70.664269, -33.537554);
  public markers: MarkerAndColor[] = [];

  ngAfterViewInit(): void {
    if (!this.divMap) return;

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: 12, // starting zoom
    });

    //Lineas como referencia para crear un marcador
    // const markerHtml = document.createElement('div');
    // markerHtml.innerHTML = 'Im a marker';

    // const marker = new Marker({
    //   color: 'red',
    //   element: markerHtml,
    // })
    //   .setLngLat(this.currentLngLat)
    //   .addTo(this.map);

    this.loadFromLocalStorage();
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  createMarker(): void {
    if (!this.map) return;

    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );
    const lngLat = this.map.getCenter();

    this.addMarker(lngLat, color);
  }

  addMarker(lgnLat: LngLat, color: string): void {
    if (!this.map) return;

    const marker = new Marker({
      color,
      draggable: true,
    })
      .setLngLat(lgnLat)
      .addTo(this.map);

    this.markers.push({
      marker,
      color,
    });

    this.saveToLocalStorage();

    marker.on('dragend', () => {
      this.saveToLocalStorage();
    });
  }

  removeMarker(index: number): void {
    this.markers[index].marker.remove();
    this.markers.splice(index, 1);
  }

  flyTo(marker: Marker): void {
    this.map?.flyTo({
      zoom: 15,
      center: marker.getLngLat(),
    });
  }

  saveToLocalStorage(): void {
    const plainMarkers: PlainMarker[] = this.markers.map(
      ({ marker, color }) => {
        return {
          lngLat: marker.getLngLat().toArray(),
          color,
        };
      }
    );

    localStorage.setItem('plainMarkers', JSON.stringify(plainMarkers));
  }

  loadFromLocalStorage(): void {
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkers: PlainMarker[] = JSON.parse(plainMarkersString);

    plainMarkers.forEach(({ lngLat, color }) => {
      const [lng, lat] = lngLat;
      const coords = new LngLat(lng, lat);

      this.addMarker(coords, color);
    });
  }
}
