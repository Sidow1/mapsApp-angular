import { Component } from '@angular/core';

interface MenuItem {
  route: string;
  name: string;
}

@Component({
  selector: 'maps-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css'],
})
export class SideMenuComponent {
  menuItems: MenuItem[] = [
    { route: '/maps/fullscreen', name: 'Full Screen' },
    { route: '/maps/markers', name: 'Markers' },
    { route: '/maps/properties', name: 'Properties' },
    { route: '/maps/zoom-range', name: 'Zoom Range' },
  ];
}
