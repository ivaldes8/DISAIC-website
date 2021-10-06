import { Injectable } from '@angular/core';
import { Theme, light, dark, blue } from "./theme";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private active: Theme = light;
  private availableThemes: Theme[] = [light, dark, blue];

  constructor() { }

  getAvailableThemes(): Theme[] {
    return this.availableThemes;
  }

  getActiveTheme(): Theme {
    return this.active;
  }

  isDarkTheme(): boolean {
    return this.active.name === dark.name;
  }

  isBlueTheme(): boolean {
    return this.active.name === dark.name;
  }

  setDarkTheme(): void {
    this.setActiveTheme(dark);
  }

  setBlueTheme(): void {
    this.setActiveTheme(blue);
  }

  setLightTheme(): void {
    this.setActiveTheme(light);
  }

  setActiveTheme(theme: Theme): void {
    this.active = theme;

    Object.keys(this.active.properties).forEach(property => {
      document.documentElement.style.setProperty(
        property,
        this.active.properties[property]
      );
    });
  }
}
