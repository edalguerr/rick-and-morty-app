import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DialogService } from '@ngneat/dialog';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { MasterList } from 'src/app/shared/models/master-list/master-list';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { environment } from 'src/environments/development';
import { HeaderTemplateComponent } from '../../shared/components/header-template/header-template.component';
import { SearchFilterComponent } from '../../shared/components/search-filter/search-filter.component';
import { FilterGroupComponent } from '../../shared/components/filter-group/filter-group.component';
import { TranslateModule } from '@ngx-translate/core';
import dependencyFilters from './model/dependency-filters';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CardPreviewTextComponent } from '../../shared/components/card-preview-text/card-preview-text.component';
import { LocationDetailComponent } from './components/location-detail/location-detail.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

const paths = environment.paths;
@Component({
  selector: 'app-locations',
  standalone: true,
  templateUrl: './locations.component.html',
  styleUrl: './locations.component.scss',
  providers: [
    {
      provide: 'dependencies',
      useValue: [
        { isEnum: true, name: 'type', values: dependencyFilters.type },
        {
          isEnum: true,
          name: 'dimension',
          values: dependencyFilters.dimension,
        },
      ],
    },
  ],
  imports: [
    CommonModule,
    HeaderTemplateComponent,
    SearchFilterComponent,
    FilterGroupComponent,
    TranslateModule,
    InfiniteScrollModule,
    CardPreviewTextComponent,
    NgxSkeletonLoaderModule,
  ],
})
export default class LocationsComponent extends MasterList implements OnInit {
  searchInputMessages = {
    label: 'app.pages.locations.header.searchFilter.label',
    placeholder: 'app.pages.locations.header.searchFilter.placeholder',
  };
  detailMessagesObj = {
    title: 'app.pages.locations.infoLabels.name',
    description: 'app.pages.locations.infoLabels.type',
  };

  get nameField(): FormControl {
    return this.filterForm.get('name') as FormControl;
  }

  constructor(
    httpService: HttpService,
    @Inject('dependencies') dependencies: any[],
    dialogService: DialogService
  ) {
    super(httpService, `${paths.locations}`, dependencies, dialogService);
    this.loadForm();
  }

  override ngOnInit(): void {
    super.ngOnInit();

    const subForm = this.filterForm.valueChanges.subscribe((value) => {
      if (
        (!!value.type || !!value.dimension) &&
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
          if (value && !this.cleaningFilters) {
            this.search();
          }
        });

      this.subscriptions.push(subNameFilter);
    }
  }

  private loadForm(): void {
    this.filterForm = new FormGroup({
      name: new FormControl(null),
      type: new FormControl(null),
      dimension: new FormControl(null),
    });
  }

  getFormControl(name: string): FormControl {
    return this.filterForm.get(name) as FormControl;
  }

  showDetail(data: any) {
    this.openDetailsDialog(LocationDetailComponent, {
      title: data.name,
      description: data.type,
      additional: data.dimension,
      messages: {
        ...this.detailMessagesObj,
        additional: 'app.pages.locations.infoLabels.dimension',
      },
    });
  }
}
