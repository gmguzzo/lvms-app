import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedMaterialModule } from '../material.module';
import { AuthLayoutComponent } from '../layouts/auth-layout/auth-layout.component';
import { RouterModule } from '@angular/router';

const componentsShared = [
  AuthLayoutComponent
];

const declarations = [
  SharedMaterialModule,
  FormsModule, ReactiveFormsModule,
  FlexLayoutModule
];

@NgModule({
  declarations: [
    ...componentsShared
  ],
  imports: [
    ...declarations,
    CommonModule,
    RouterModule,
  ],
  exports: [
    ...componentsShared,
    ...declarations
  ]
})
export class SharedModule {
}
