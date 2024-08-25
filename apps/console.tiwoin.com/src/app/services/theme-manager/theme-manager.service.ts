import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ThemeManagerService {
    /**
     * localStorage key for current theme storage
     * Avaiable in config file in /assets/config
     */
    private _themeStorageKey = '';
    set themeStorageKey(key: string) {
        if (!key) return;
        this._themeStorageKey = key;
    }
    get themeStorageKey() {
        return this._themeStorageKey;
    }

    /**
     * list of available themes
     * Avaiable in config file in /assets/config
     */
    private _themeLIst: {
        name: string;
        className: string;
        isDefault?: boolean;
    }[] = [];
    set themeList(list: { name: string; className: string; isDefault?: boolean }[]) {
        if (!list) return;
        this._themeLIst = list;
    }
    get themeList() {
        return this._themeLIst;
    }

    /**
     * Currently active theme
     */
    currentActiveTheme: {
        name: string;
        className: string;
        isDefault?: boolean;
    } | null = null;

    /**
     * Apply theme class on body element
     */
    private themeElement = document.body.classList;

    private storeThemeName(name: string) {
        if (!name) return;
        localStorage.setItem(this.themeStorageKey, name);
    }

    private getStoredThemeName() {
        try {
            return localStorage.getItem(this.themeStorageKey) || '';
        } catch {
            return '';
        }
    }

    private applyClass(newToken: string, oldToken: string) {
        return oldToken ? this.themeElement.replace(oldToken, newToken) : this.themeElement.add(newToken);
    }

    setTheme(name: string = '') {
        try {
            const oldTheme = this.currentActiveTheme;
            const storedThemeName = this.getStoredThemeName();
            const newTheme = name ? this.themeList.find((theme) => theme.name === name) : null;
            const storedTheme = storedThemeName
                ? this.themeList.find((theme) => theme.name === storedThemeName)
                : this.themeList.find((theme) => theme.isDefault);

            if (this.currentActiveTheme?.name === name) return;
            if (!this.themeList) return;
            if (!this.themeElement) return;
            if (!this.themeStorageKey) return;

            if (newTheme) {
                this.currentActiveTheme = { ...newTheme };
            }

            if (!newTheme) {
                this.currentActiveTheme = storedTheme ? { ...storedTheme } : null;
            }

            this.applyClass(this.currentActiveTheme?.className || '', oldTheme?.className || '');
            this.storeThemeName(this.currentActiveTheme?.name || '');
        } catch (e) {
            throw new Error('Unable to apply theme');
        }
    }
}
