import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderTemplateComponent } from '../../shared/components/header-template/header-template.component';
import { SearchFilterComponent } from '../../shared/components/search-filter/search-filter.component';
import { FilterGroupComponent } from '../../shared/components/filter-group/filter-group.component';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { CardPreviewComponent } from '../../shared/components/card-preview/card-preview.component';
import dependencyFilters from './model/dependency-filters';
import { TranslateModule } from '@ngx-translate/core';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { DialogService } from '@ngneat/dialog';
import { CharacterDetailComponent } from './components/character-detail/character-detail.component';
import { environment } from '../../../environments/development';
import { MasterList } from '../../shared/models/master-list/master-list';
import { HttpService } from '../../shared/services/http/http.service';

const paths = environment.paths;

@Component({
  selector: 'app-characters',
  standalone: true,
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
  imports: [
    CommonModule,
    HeaderTemplateComponent,
    SearchFilterComponent,
    FilterGroupComponent,
    CardPreviewComponent,
    TranslateModule,
    InfiniteScrollModule,
    NgxSkeletonLoaderModule,
  ],
  providers: [
    {
      provide: 'dependencies',
      useValue: [
        { isEnum: true, name: 'status', values: dependencyFilters.status },
        { isEnum: true, name: 'species', values: dependencyFilters.species },
        { isEnum: true, name: 'gender', values: dependencyFilters.gender },
      ],
    },
  ],
})
export default class CharactersComponent extends MasterList implements OnInit {
  searchInputMessages = {
    label: 'app.pages.characters.header.searchFilter.label',
    placeholder: 'app.pages.characters.header.searchFilter.placeholder',
  };

  get nameField(): FormControl {
    return this.filterForm.get('name') as FormControl;
  }

  constructor(
    httpService: HttpService,
    @Inject('dependencies') dependencies: any[],
    dialogService: DialogService
  ) {
    super(httpService, `${paths.characters}`, dependencies, dialogService);
    this.loadForm();
  }

  override ngOnInit(): void {
    super.ngOnInit();

    const subForm = this.filterForm.valueChanges.subscribe((value) => {
      if (
        (!!value.status || !!value.species || !!value.gender) &&
        this.filterForm.valid &&
        !this.cleaningFilters
      ) {
        this.search();
      }
    });
    this.subscriptions.push(subForm);

    if (this.nameField) {
      const subNameFilter = this.nameField.valueChanges
        .pipe(debounceTime(500), distinctUntilChanged())
        .subscribe((value) => {
          if (!this.cleaningFilters) {
            this.search();
          }
        });

      this.subscriptions.push(subNameFilter);
    }    
  }

  private loadForm(): void {
    this.filterForm = new FormGroup({
      name: new FormControl(null),
      status: new FormControl(null),
      species: new FormControl(null),
      gender: new FormControl(null),
    });
  }

  getFormControl(name: string): FormControl {
    return this.filterForm.get(name) as FormControl;
  }  

  showDetail(data: any) {
    this.openDetailsDialog(CharacterDetailComponent, data);
  }
}
