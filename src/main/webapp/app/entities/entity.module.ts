import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { MyLibAuthorModule } from './author/author.module';
import { MyLibBookModule } from './book/book.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        MyLibAuthorModule,
        MyLibBookModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyLibEntityModule {}
