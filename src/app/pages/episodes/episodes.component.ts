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
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TranslateModule } from '@ngx-translate/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CardPreviewTextComponent } from '../../shared/components/card-preview-text/card-preview-text.component';
import { EpisodeDetailComponent } from './components/episode-detail/episode-detail.component';

const paths = environment.paths;
@Component({
  selector: 'app-episodes',
  standalone: true,
  templateUrl: './episodes.component.html',
  styleUrl: './episodes.component.scss',
  providers: [
    {
      provide: 'dependencies',
      useValue: [],
    },
  ],
  imports: [
    CommonModule,
    HeaderTemplateComponent,
    SearchFilterComponent,
    InfiniteScrollModule,
    TranslateModule,
    NgxSkeletonLoaderModule,
    CardPreviewTextComponent,
  ],
})
export default class EpisodesComponent extends MasterList implements OnInit {
  searchInputMessages = {
    label: 'app.pages.episodes.header.searchFilter.label',
    placeholder: 'app.pages.episodes.header.searchFilter.placeholder',
  };
  detailMessagesObj = {
    title: 'app.pages.episodes.infoLabels.name',
    description: 'app.pages.episodes.infoLabels.episode',
  };

  get nameField(): FormControl {
    return this.filterForm.get('name') as FormControl;
  }

  constructor(
    httpService: HttpService,
    @Inject('dependencies') dependencies: any[],
    dialogService: DialogService
  ) {
    super(httpService, `${paths.episodes}`, dependencies, dialogService);
    this.loadForm();
  }

  override ngOnInit(): void {
    super.ngOnInit();

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
    });
  }

  getFormControl(name: string): FormControl {
    return this.filterForm.get(name) as FormControl;
  }

  showDetail(data: any) {
    this.openDetailsDialog(EpisodeDetailComponent, {
      title: data.name,
      description: data.episode,
      additional: data.air_date,
      messages: {
        ...this.detailMessagesObj,
        additional: 'app.pages.episodes.infoLabels.air_date',
      },
    });
  }
}
