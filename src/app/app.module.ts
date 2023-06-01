import localEs from '@angular/common/locales/es-PE';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientesModule } from './clientes/clientes.module';
import { registerLocaleData } from '@angular/common';
import { AuthModule } from './auth/auth.module';
import { TokenInterceptor } from './interceptors/token.interceptors';
import { AuthInterceptor } from './interceptors/auth.interceptors';
import { FacturasModule } from './facturas/facturas.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

registerLocaleData(localEs,'es');

@NgModule({
  declarations: [
    AppComponent,


  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ClientesModule,
    FacturasModule,
    AuthModule,
    BrowserAnimationsModule
  ],
  providers: [
    {provide : HTTP_INTERCEPTORS, useClass :TokenInterceptor, multi : true},
    {provide : HTTP_INTERCEPTORS, useClass :AuthInterceptor, multi : true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
