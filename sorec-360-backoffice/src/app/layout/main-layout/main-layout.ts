import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '@layout/sidebar/sidebar';
import { Topbar } from '@layout/topbar/topbar';
import { Toast } from '@shared/toast/toast';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, Sidebar, Topbar, Toast],
  template: `
    <div class="app">
      <app-sidebar />
      <div class="app-content">
        <app-topbar />
        <main class="app-main">
          <router-outlet />
        </main>
      </div>
    </div>
    <app-toast />
  `,
  styleUrl: './main-layout.scss',
})
export class MainLayout {}
