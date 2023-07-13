import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [AppComponent, HomeComponent],
    imports: [
        BrowserModule,
        // FormsModule,
        // ReactiveFormsModule,
        RouterModule.forRoot([{ path: '', component: HomeComponent }]),
        BrowserAnimationsModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
