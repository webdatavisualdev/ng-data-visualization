import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatStepperModule, MatFormFieldModule, MatInputModule, MatIconModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CirclePackComponent } from './components/circle-pack/circle-pack.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DoubleCirclePackComponent } from './components/double-circle-pack/double-circle-pack.component';
import { RectPackComponent } from './components/rect-pack/rect-pack.component';

@NgModule({
  declarations: [
    AppComponent,
    CirclePackComponent,
    DoubleCirclePackComponent,
    RectPackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
