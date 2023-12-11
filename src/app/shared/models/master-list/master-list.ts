import { FormGroup } from '@angular/forms';
import { IGetQueryParams } from '../../interfaces/query-params';
import { HttpService } from '../../services/http/http.service';
import {
  Directive,
  HostListener,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { DialogService } from '@ngneat/dialog';

@Directive()
export abstract class MasterList implements OnDestroy, OnInit {
  dependencyItems: any = {};
  filterForm: FormGroup = new FormGroup({});
  cleaningFilters = false;
  current: number = 1;
  finishPage: number = 6;
  items: any[] = [];
  perPage = 20;
  nextPageAvailable = false;
  getQueryParams: IGetQueryParams = {
    pagination: {
      size: this.perPage,
      currentPage: this.current,
    },
  };
  firstLoading = false;
  loading = false;
  showBackButton = false;
  favoritesActive = false;

  protected subscriptions: Subscription[] = [];

  constructor(
    protected httpService: HttpService,
    @Inject('PathUri') private pathUri: string,
    @Inject('dependencies') protected dependencies: any[],
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.firstLoading = true;
    this.search();

    this.dependencies.forEach((dependency: any) => {
      if (dependency.isEnum) {
        this.getDependencyEnum(dependency.name, dependency.values);
      } else {
        this.getDependency(dependency.name, dependency.path);
      }
    });
  }

  search(mapper?: any, nextPage?: number) {
    let filterObject = mapper
      ? new mapper(this.filterForm.value)
      : this.getBody();
    this.getQueryParams.filter = {
      ...filterObject,
    };
    
    this.favoritesActive = false;
    this.onGoTo(nextPage || 1);
  }

  onNext(page: number, mergeContent = false): void {
    this.current = page + 1;
    this.paginate(this.current, this.perPage, mergeContent);
  }

  onPrevious(page: number): void {
    this.current = page - 1;
    this.paginate(this.current, this.perPage);
  }

  onGoTo(page: number): void {
    this.current = page;
    this.paginate(this.current, this.perPage);
  }

  paginate(current: number, perPage: number, mergeContent = false): void {
    this.favoritesActive = false;
    this.getQueryParams.pagination = {
      size: perPage,
      currentPage: current,
    };

    this._getItems(mergeContent);
  }

  private _getItems(mergeContent = false): void {
    this.loading = true;
    this.favoritesActive = false;

    //TODO: uncomment to test the skeletons clearly
    // setTimeout(() => {

    const sub = this.httpService
      .get(this.pathUri, this.getQueryParams)
      .subscribe({
        next: ({ info, results }) => {
          if (mergeContent) this.items.push(...results);
          else this.items = results;
          this.nextPageAvailable = !!info?.next;

          this.firstLoading = false;
          this.loading = false;
        },
        error: () => {
          this.firstLoading = false;
          this.loading = false;
          this.items = [];
        },
      });
    this.subscriptions.push(sub);

    // }, 4000);
  }

  protected getBody(): any {
    return this.filterForm.getRawValue();
  }

  clearFilter() {
    this.favoritesActive = false;
    Object.entries(this.filterForm.value).forEach(([name, value]) => {
      this.cleaningFilters = true;
      this.filterForm?.get(name)?.setValue(null);
    });
    delete this.getQueryParams.filter;
    this.items = [];
    this.cleaningFilters = false;
    this.search();
  }

  getDependency(nameDependency: string, path: string): void {
    const sub = this.httpService.get(path).subscribe(({ results, info }) => {
      this.dependencyItems[nameDependency] = results;
    });
    this.subscriptions.push(sub);
  }

  getDependencyEnum(name: string, dependencyValues: any): void {
    this.dependencyItems[name] = dependencyValues.map(
      (value: string, index: number) => ({
        label: value,
        id: index,
        check: false,
      })
    );
  }

  onScroll() {
    if (
      !(this.current < this.finishPage) ||
      this.loading ||
      !this.nextPageAvailable ||
      this.favoritesActive
    )
      return;

    this.onNext(this.current, true);
  }

  openDetailsDialog(component: any, data: any): void {
    const dialogRef = this.dialogService.open(component, {
      data,
    });
  }

  scrollUp() {
    if (!window) return;
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const verticalOffset =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    this.showBackButton = verticalOffset > window.innerHeight * 2.5;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub && sub.unsubscribe());
  }
}
