import * as i0 from '@angular/core';
import { Component, ChangeDetectionStrategy, Directive, NgModule, Injectable, ViewEncapsulation, Inject, Optional, Input, EventEmitter, Output, HostBinding, ContentChild, ContentChildren, ViewChild } from '@angular/core';
import * as i4 from '@angular/common';
import { CommonModule, DOCUMENT } from '@angular/common';
import * as i10 from '@angular/material/badge';
import { MatBadgeModule } from '@angular/material/badge';
import * as i6 from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import * as i2 from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import * as i3$1 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import * as i8 from '@angular/material/input';
import { MatInputModule } from '@angular/material/input';
import * as i5 from '@angular/material/menu';
import { MatMenuModule } from '@angular/material/menu';
import { EMPTY, interval, fromEvent, timer, Subject, merge, BehaviorSubject, concat, of } from 'rxjs';
import { debounceTime, map, debounce, takeUntil, mapTo, tap } from 'rxjs/operators';
import * as i1 from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import * as i1$1 from '@angular/platform-browser';
import * as i3 from '@mapp-ui/notification-center';
import * as i8$1 from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import { trigger, state, style, transition, animate } from '@angular/animations';
import * as i2$1 from '@angular/router';
import * as i1$2 from '@angular/material/sidenav';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import * as i6$1 from '@angular/cdk/a11y';
import { A11yModule } from '@angular/cdk/a11y';
import * as i5$2 from '@angular/cdk/overlay';
import { OverlayModule } from '@angular/cdk/overlay';
import * as i1$3 from '@angular/forms';
import { Validators, ReactiveFormsModule } from '@angular/forms';
import * as i9 from '@angular/material/select';
import { MatSelectModule } from '@angular/material/select';
import * as i8$2 from '@angular/material/slide-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import * as i5$1 from '@angular/material/tabs';
import { MatTabsModule } from '@angular/material/tabs';
import * as i10$1 from '@angular/material/core';

/** @deprecated */
class MuiAppHeaderComponent {
}
MuiAppHeaderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiAppHeaderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
MuiAppHeaderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: MuiAppHeaderComponent, selector: "mui-app-header", exportAs: ["muiAppHeader"], ngImport: i0, template: "<div class=\"mui-app-header\">\r\n  <div class=\"mui-app-header-menu\">\r\n    <ng-content select=\"[muiAppHeaderMenu]\"></ng-content>\r\n  </div>\r\n  <div class=\"mui-app-header-logo\"></div>\r\n  <div class=\"mui-app-header-title\">\r\n    <ng-content select=\"[muiAppHeaderTitle]\"></ng-content>\r\n  </div>\r\n  <div class=\"mui-app-header-actions\">\r\n    <ng-content select=\"[muiAppHeaderActions]\"></ng-content>\r\n  </div>\r\n</div>\r\n", styles: [".mui-app-header{height:54px;min-height:54px;padding:0 13px;display:flex;flex-direction:row}.mui-app-header-menu{height:54px;line-height:52px}.mui-app-header-logo{background:url(\"data:image/svg+xml,%3C%3Fxml version%3D%221.0%22 encoding%3D%22UTF-8%22 standalone%3D%22no%22%3F%3E%0D%3Csvg width%3D%2267px%22 height%3D%2218px%22 viewBox%3D%220 0 67 18%22 version%3D%221.1%22 xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%0D    %3C!-- Generator%3A Sketch 40.3 (33839) - http%3A%2F%2Fwww.bohemiancoding.com%2Fsketch --%3E%0D    %3Ctitle%3Emapp-v2_transparent%3C%2Ftitle%3E%0D    %3Cdesc%3ECreated with Sketch.%3C%2Fdesc%3E%0D    %3Cdefs%3E%0D        %3Cpolygon id%3D%22path-1%22 points%3D%220.0113684211 17.4136204 66.3157895 17.4136204 66.3157895 0.153504849 0.0113684211 0.153504849%22%3E%3C%2Fpolygon%3E%0D    %3C%2Fdefs%3E%0D    %3Cg id%3D%22Page-1%22 stroke%3D%22none%22 stroke-width%3D%221%22 fill%3D%22none%22 fill-rule%3D%22evenodd%22%3E%0D        %3Cg id%3D%22Group-10%22 transform%3D%22translate(-64.000000%2C -100.000000)%22%3E%0D            %3Cg id%3D%22Group-4-Copy%22 transform%3D%22translate(42.000000%2C 89.000000)%22%3E%0D                %3Cg id%3D%22mapp-v2_transparent%22 transform%3D%22translate(22.000000%2C 11.000000)%22%3E%0D                    %3Cpath d%3D%22M35.6257895%2C2.12181179 C35.0607789%2C1.56552233 34.3902316%2C1.12147501 33.6321474%2C0.801405094 C32.8744421%2C0.484363636 32.0602737%2C0.323476926 31.2121895%2C0.323476926 C30.3588%2C0.323476926 29.5397053%2C0.489095598 28.7778316%2C0.815222423 C28.0142526%2C1.14191708 27.3399158%2C1.59448193 26.7737684%2C2.15966748 C26.2066737%2C2.72447447 25.7528842%2C3.39243824 25.4256632%2C4.14444165 C25.0988211%2C4.89190237 24.9332211%2C5.70504273 24.9332211%2C6.56152787 C24.9332211%2C7.41763444 25.0978737%2C8.23399253 25.4226316%2C8.98788873 C25.7481474%2C9.74784184 26.2011789%2C10.4205376 26.7686526%2C10.9870481 C27.3365053%2C11.5541264 28.0097053%2C12.0063127 28.7696842%2C12.3314931 C29.5308%2C12.6578092 30.348%2C12.8232386 31.1987368%2C12.8232386 L31.3563789%2C12.8232386 L31.3563789%2C10.6686817 L31.1987368%2C10.6686817 C30.6324%2C10.6686817 30.0965684%2C10.5583323 29.6065895%2C10.3412299 C29.1130105%2C10.1222347 28.6747579%2C9.82431034 28.3039579%2C9.45616369 C27.9346737%2C9.08707065 27.6366316%2C8.65097303 27.4177895%2C8.15998465 C27.1991368%2C7.67051049 27.0882947%2C7.13636662 27.0882947%2C6.57231674 C27.0882947%2C6.01091676 27.1991368%2C5.47393371 27.4183579%2C4.97537418 C27.6354947%2C4.47776105 27.9335368%2C4.0374993 28.3035789%2C3.66783843 C28.6766526%2C3.29723116 29.1141474%2C3.00422807 29.6043158%2C2.79602174 C30.5992421%2C2.37128083 31.7974737%2C2.37203794 32.8079368%2C2.79677885 C33.3051158%2C3.00347096 33.7471579%2C3.29647405 34.1204211%2C3.66745987 C34.4897053%2C4.03617436 34.7837684%2C4.47567899 34.9942737%2C4.9734814 C35.2053474%2C5.47734072 35.3122105%2C6.01621656 35.3122105%2C6.57458808 L35.3122105%2C12.8232386 L37.4672842%2C12.8232386 L37.4672842%2C6.56152787 C37.4672842%2C5.69501097 37.3014947%2C4.86994607 36.9752211%2C4.10828946 C36.6489474%2C3.35079697 36.1949684%2C2.68264393 35.6257895%2C2.12181179%22 id%3D%22Fill-1%22 fill%3D%22%23FFFFFF%22%3E%3C%2Fpath%3E%0D                    %3Cpath d%3D%22M50.0693684%2C2.11310498 C49.5102316%2C1.54621592 48.8381684%2C1.08910839 48.0709895%2C0.754653309 C47.3032421%2C0.421144623 46.4722105%2C0.252118938 45.6013895%2C0.252118938 C44.73%2C0.252118938 43.9040842%2C0.421333901 43.1469474%2C0.754842587 C42.3882947%2C1.08778344 41.7156632%2C1.54470169 41.1472421%2C2.11234786 C40.5803368%2C2.67885836 40.1274947%2C3.35041841 39.8012211%2C4.10866801 C39.4747579%2C4.86937823 39.3091579%2C5.68649344 39.3091579%2C6.53786806 L39.3091579%2C17.4136204 L41.4665053%2C17.4136204 L41.4665053%2C6.53786806 C41.4665053%2C5.97173611 41.5733684%2C5.43115677 41.7842526%2C4.93108302 C41.9964632%2C4.42873793 42.2909053%2C3.98355494 42.6598105%2C3.60745859 C43.0247368%2C3.23287648 43.4660211%2C2.93495215 43.9719158%2C2.72201385 C44.4700421%2C2.51153618 45.0181895%2C2.4049724 45.6013895%2C2.4049724 C46.1756842%2C2.4049724 46.7020421%2C2.508697 47.2098316%2C2.72201385 C47.7138316%2C2.93438431 48.1590947%2C3.2326872 48.5340632%2C3.6091621 C48.9097895%2C3.98204071 49.2082105%2C4.42684514 49.4209895%2C4.93108302 C49.6316842%2C5.43058893 49.7383579%2C5.97116828 49.7383579%2C6.53786806 C49.7383579%2C7.1206565 49.6316842%2C7.66937482 49.4209895%2C8.16812362 C49.2074526%2C8.67255078 48.9094105%2C9.11243397 48.5344421%2C9.47698433 C48.1626947%2C9.84304891 47.7170526%2C10.1369984 47.2096421%2C10.3508831 C46.6990105%2C10.566282 46.1728421%2C10.670953 45.6013895%2C10.670953 L45.4437474%2C10.670953 L45.4437474%2C12.8239957 L45.6013895%2C12.8239957 C46.4697474%2C12.8239957 47.3002105%2C12.6585663 48.0700421%2C12.3322502 C48.8379789%2C12.0057449 49.5108%2C11.55318 50.0691789%2C10.9870481 C50.6300211%2C10.4188341 51.0790737%2C9.74651689 51.4042105%2C8.98883512 C51.7287789%2C8.23437109 51.8934316%2C7.40968474 51.8934316%2C6.53786806 C51.8934316%2C5.68308643 51.7287789%2C4.86597122 51.4042105%2C4.10847874 C51.0785053%2C3.35174336 50.6292632%2C2.68056187 50.0693684%2C2.11310498%22 id%3D%22Fill-2%22 fill%3D%22%23FFFFFF%22%3E%3C%2Fpath%3E%0D                    %3Cg id%3D%22Group-6%22%3E%0D                        %3Cmask id%3D%22mask-2%22 fill%3D%22white%22%3E%0D                            %3Cuse xlink%3Ahref%3D%22%23path-1%22%3E%3C%2Fuse%3E%0D                        %3C%2Fmask%3E%0D                        %3Cg id%3D%22Clip-4%22%3E%3C%2Fg%3E%0D                        %3Cpath d%3D%22M65.8265684%2C4.00986465 C65.5010526%2C3.25369711 65.052%2C2.58213705 64.4919158%2C2.01449089 C63.9327789%2C1.44741255 63.2603368%2C0.990305019 62.4933474%2C0.656039219 C61.7254105%2C0.322530534 60.8945684%2C0.153504849 60.0235579%2C0.153504849 C59.1523579%2C0.153504849 58.3264421%2C0.322719812 57.5693053%2C0.656039219 C56.8106526%2C0.989169348 56.1378316%2C1.44589833 55.5697895%2C2.01373377 C55.0028842%2C2.58005499 54.5498526%2C3.25161505 54.2233895%2C4.01005392 C53.8971158%2C4.77095342 53.7315158%2C5.58806863 53.7315158%2C6.43925397 L53.7315158%2C17.4136204 L55.8888632%2C17.4136204 L55.8888632%2C6.43925397 C55.8888632%2C5.87293275 55.9957263%2C5.33216412 56.2068%2C4.83227965 C56.4184421%2C4.3305024 56.7128842%2C3.88531941 57.0821684%2C3.50865523 C57.4472842%2C3.13407311 57.8885684%2C2.83633806 58.3942737%2C2.62339976 C58.8922105%2C2.41292209 59.4405474%2C2.30635831 60.0235579%2C2.30635831 C60.5982316%2C2.30635831 61.1244%2C2.41008291 61.6321895%2C2.62339976 C62.1361895%2C2.83577022 62.5814526%2C3.13407311 62.9564211%2C3.51054801 C63.3323368%2C3.8836159 63.6307579%2C4.32823105 63.8433474%2C4.83227965 C64.0542316%2C5.33216412 64.1612842%2C5.87293275 64.1612842%2C6.43925397 C64.1612842%2C7.02147458 64.0542316%2C7.5701929 63.8433474%2C8.06950953 C63.6296211%2C8.57393669 63.3315789%2C9.01381988 62.9568%2C9.37818096 C62.5852421%2C9.74443482 62.1394105%2C10.038195 61.632%2C10.252269 C61.1215579%2C10.4676679 60.5952%2C10.5723389 60.0235579%2C10.5723389 L59.8661053%2C10.5723389 L59.8661053%2C12.7253816 L60.0235579%2C12.7253816 C60.8919158%2C12.7253816 61.7225684%2C12.5599522 62.4924%2C12.2336361 C63.2603368%2C11.90732 63.9329684%2C11.4545659 64.4921053%2C10.888434 C65.0527579%2C10.3198414 65.5018105%2C9.64752424 65.8265684%2C8.89022103 C66.1511368%2C8.13613556 66.3157895%2C7.31125993 66.3157895%2C6.43925397 C66.3157895%2C5.58428306 66.1511368%2C4.76697858 65.8265684%2C4.00986465%22 id%3D%22Fill-3%22 fill%3D%22%23FFFFFF%22 mask%3D%22url(%23mask-2)%22%3E%3C%2Fpath%3E%0D                        %3Cpath d%3D%22M22.6095158%2C4.09901481 L22.6093263%2C4.09901481 C22.2771789%2C3.34549717 21.8199789%2C2.67526207 21.2502316%2C2.10666951 C20.6804842%2C1.53978045 20.0038737%2C1.08475498 19.2395368%2C0.75446403 C18.4719789%2C0.421144623 17.6418947%2C0.252118938 16.7725895%2C0.252118938 C15.6363158%2C0.252118938 14.5892842%2C0.526951295 13.6604842%2C1.06904487 C12.8042526%2C1.57044357 12.0950526%2C2.22326505 11.5489895%2C3.01160993 C11.0260421%2C2.22212938 10.3213895%2C1.56911862 9.45151579%2C1.06828775 C8.50698947%2C0.526762016 7.45294737%2C0.252118938 6.31875789%2C0.252118938 C5.44888421%2C0.252118938 4.6224%2C0.418494724 3.86204211%2C0.746325055 C3.10244211%2C1.07737312 2.42981053%2C1.52937014 1.86252632%2C2.09058084 C1.29827368%2C2.6512237 0.841831579%2C3.32145881 0.505894737%2C4.08311542 C0.199894737%2C4.77890312 0.0320210526%2C5.53185292 0.00606315789%2C6.32379409 L0%2C12.8236172 L2.15469474%2C12.8236172 L2.15734737%2C6.53786806 C2.15734737%2C5.95299755 2.2644%2C5.40465778 2.47547368%2C4.90723393 C2.68616842%2C4.4069709 2.9844%2C3.96595204 3.36183158%2C3.59648044 C3.73831579%2C3.22795524 4.18395789%2C2.9336272 4.68682105%2C2.72201385 C5.18437895%2C2.51115762 5.73347368%2C2.40440456 6.31875789%2C2.40440456 C6.90176842%2C2.40440456 7.45086316%2C2.51115762 7.95088421%2C2.72220313 C8.45298947%2C2.93438431 8.89408421%2C3.22814451 9.26128421%2C3.59496621 C9.63094737%2C3.96689843 9.9252%2C4.40848513 10.1362737%2C4.90780177 C10.3471579%2C5.40465778 10.4538316%2C5.95318682 10.4538316%2C6.53786806 L10.4538316%2C12.8474663 L12.6113684%2C12.8474663 L12.6113684%2C6.53786806 C12.6113684%2C5.95564744 12.7224%2C5.40768624 12.9418105%2C4.90912672 C13.1595158%2C4.40981008 13.4624842%2C3.9680341 13.8414316%2C3.596859 C14.2217053%2C3.2273874 14.6652632%2C2.93287008 15.1601684%2C2.72182457 C15.6518526%2C2.51115762 16.1899579%2C2.40440456 16.7593263%2C2.40440456 C17.3457474%2C2.40440456 17.8969263%2C2.51115762 18.3969474%2C2.72220313 C18.8973474%2C2.9326808 19.3443158%2C3.22681957 19.7245895%2C3.59648044 C20.1046737%2C3.96860194 20.4036632%2C4.40943152 20.6136%2C4.90761249 C20.8263789%2C5.40901119 20.934%2C5.95754023 20.934%2C6.53786806 L20.934%2C12.8474663 L23.0888842%2C12.8474663 L23.0886947%2C6.54524992 C23.0708842%2C5.57974038 22.9185474%2C4.80237365 22.6095158%2C4.09901481%22 id%3D%22Fill-5%22 fill%3D%22%23FFFFFF%22 mask%3D%22url(%23mask-2)%22%3E%3C%2Fpath%3E%0D                    %3C%2Fg%3E%0D                %3C%2Fg%3E%0D            %3C%2Fg%3E%0D        %3C%2Fg%3E%0D    %3C%2Fg%3E%0D%3C%2Fsvg%3E\") left 20px no-repeat;height:100%;width:71px;margin-left:13px;margin-right:6px}.mui-app-header-title{font-size:14px;height:54px;line-height:55px;margin-left:12px}.mui-app-header-actions{height:54px;line-height:52px;margin-left:auto}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiAppHeaderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mui-app-header', exportAs: 'muiAppHeader', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"mui-app-header\">\r\n  <div class=\"mui-app-header-menu\">\r\n    <ng-content select=\"[muiAppHeaderMenu]\"></ng-content>\r\n  </div>\r\n  <div class=\"mui-app-header-logo\"></div>\r\n  <div class=\"mui-app-header-title\">\r\n    <ng-content select=\"[muiAppHeaderTitle]\"></ng-content>\r\n  </div>\r\n  <div class=\"mui-app-header-actions\">\r\n    <ng-content select=\"[muiAppHeaderActions]\"></ng-content>\r\n  </div>\r\n</div>\r\n", styles: [".mui-app-header{height:54px;min-height:54px;padding:0 13px;display:flex;flex-direction:row}.mui-app-header-menu{height:54px;line-height:52px}.mui-app-header-logo{background:url(\"data:image/svg+xml,%3C%3Fxml version%3D%221.0%22 encoding%3D%22UTF-8%22 standalone%3D%22no%22%3F%3E%0D%3Csvg width%3D%2267px%22 height%3D%2218px%22 viewBox%3D%220 0 67 18%22 version%3D%221.1%22 xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%0D    %3C!-- Generator%3A Sketch 40.3 (33839) - http%3A%2F%2Fwww.bohemiancoding.com%2Fsketch --%3E%0D    %3Ctitle%3Emapp-v2_transparent%3C%2Ftitle%3E%0D    %3Cdesc%3ECreated with Sketch.%3C%2Fdesc%3E%0D    %3Cdefs%3E%0D        %3Cpolygon id%3D%22path-1%22 points%3D%220.0113684211 17.4136204 66.3157895 17.4136204 66.3157895 0.153504849 0.0113684211 0.153504849%22%3E%3C%2Fpolygon%3E%0D    %3C%2Fdefs%3E%0D    %3Cg id%3D%22Page-1%22 stroke%3D%22none%22 stroke-width%3D%221%22 fill%3D%22none%22 fill-rule%3D%22evenodd%22%3E%0D        %3Cg id%3D%22Group-10%22 transform%3D%22translate(-64.000000%2C -100.000000)%22%3E%0D            %3Cg id%3D%22Group-4-Copy%22 transform%3D%22translate(42.000000%2C 89.000000)%22%3E%0D                %3Cg id%3D%22mapp-v2_transparent%22 transform%3D%22translate(22.000000%2C 11.000000)%22%3E%0D                    %3Cpath d%3D%22M35.6257895%2C2.12181179 C35.0607789%2C1.56552233 34.3902316%2C1.12147501 33.6321474%2C0.801405094 C32.8744421%2C0.484363636 32.0602737%2C0.323476926 31.2121895%2C0.323476926 C30.3588%2C0.323476926 29.5397053%2C0.489095598 28.7778316%2C0.815222423 C28.0142526%2C1.14191708 27.3399158%2C1.59448193 26.7737684%2C2.15966748 C26.2066737%2C2.72447447 25.7528842%2C3.39243824 25.4256632%2C4.14444165 C25.0988211%2C4.89190237 24.9332211%2C5.70504273 24.9332211%2C6.56152787 C24.9332211%2C7.41763444 25.0978737%2C8.23399253 25.4226316%2C8.98788873 C25.7481474%2C9.74784184 26.2011789%2C10.4205376 26.7686526%2C10.9870481 C27.3365053%2C11.5541264 28.0097053%2C12.0063127 28.7696842%2C12.3314931 C29.5308%2C12.6578092 30.348%2C12.8232386 31.1987368%2C12.8232386 L31.3563789%2C12.8232386 L31.3563789%2C10.6686817 L31.1987368%2C10.6686817 C30.6324%2C10.6686817 30.0965684%2C10.5583323 29.6065895%2C10.3412299 C29.1130105%2C10.1222347 28.6747579%2C9.82431034 28.3039579%2C9.45616369 C27.9346737%2C9.08707065 27.6366316%2C8.65097303 27.4177895%2C8.15998465 C27.1991368%2C7.67051049 27.0882947%2C7.13636662 27.0882947%2C6.57231674 C27.0882947%2C6.01091676 27.1991368%2C5.47393371 27.4183579%2C4.97537418 C27.6354947%2C4.47776105 27.9335368%2C4.0374993 28.3035789%2C3.66783843 C28.6766526%2C3.29723116 29.1141474%2C3.00422807 29.6043158%2C2.79602174 C30.5992421%2C2.37128083 31.7974737%2C2.37203794 32.8079368%2C2.79677885 C33.3051158%2C3.00347096 33.7471579%2C3.29647405 34.1204211%2C3.66745987 C34.4897053%2C4.03617436 34.7837684%2C4.47567899 34.9942737%2C4.9734814 C35.2053474%2C5.47734072 35.3122105%2C6.01621656 35.3122105%2C6.57458808 L35.3122105%2C12.8232386 L37.4672842%2C12.8232386 L37.4672842%2C6.56152787 C37.4672842%2C5.69501097 37.3014947%2C4.86994607 36.9752211%2C4.10828946 C36.6489474%2C3.35079697 36.1949684%2C2.68264393 35.6257895%2C2.12181179%22 id%3D%22Fill-1%22 fill%3D%22%23FFFFFF%22%3E%3C%2Fpath%3E%0D                    %3Cpath d%3D%22M50.0693684%2C2.11310498 C49.5102316%2C1.54621592 48.8381684%2C1.08910839 48.0709895%2C0.754653309 C47.3032421%2C0.421144623 46.4722105%2C0.252118938 45.6013895%2C0.252118938 C44.73%2C0.252118938 43.9040842%2C0.421333901 43.1469474%2C0.754842587 C42.3882947%2C1.08778344 41.7156632%2C1.54470169 41.1472421%2C2.11234786 C40.5803368%2C2.67885836 40.1274947%2C3.35041841 39.8012211%2C4.10866801 C39.4747579%2C4.86937823 39.3091579%2C5.68649344 39.3091579%2C6.53786806 L39.3091579%2C17.4136204 L41.4665053%2C17.4136204 L41.4665053%2C6.53786806 C41.4665053%2C5.97173611 41.5733684%2C5.43115677 41.7842526%2C4.93108302 C41.9964632%2C4.42873793 42.2909053%2C3.98355494 42.6598105%2C3.60745859 C43.0247368%2C3.23287648 43.4660211%2C2.93495215 43.9719158%2C2.72201385 C44.4700421%2C2.51153618 45.0181895%2C2.4049724 45.6013895%2C2.4049724 C46.1756842%2C2.4049724 46.7020421%2C2.508697 47.2098316%2C2.72201385 C47.7138316%2C2.93438431 48.1590947%2C3.2326872 48.5340632%2C3.6091621 C48.9097895%2C3.98204071 49.2082105%2C4.42684514 49.4209895%2C4.93108302 C49.6316842%2C5.43058893 49.7383579%2C5.97116828 49.7383579%2C6.53786806 C49.7383579%2C7.1206565 49.6316842%2C7.66937482 49.4209895%2C8.16812362 C49.2074526%2C8.67255078 48.9094105%2C9.11243397 48.5344421%2C9.47698433 C48.1626947%2C9.84304891 47.7170526%2C10.1369984 47.2096421%2C10.3508831 C46.6990105%2C10.566282 46.1728421%2C10.670953 45.6013895%2C10.670953 L45.4437474%2C10.670953 L45.4437474%2C12.8239957 L45.6013895%2C12.8239957 C46.4697474%2C12.8239957 47.3002105%2C12.6585663 48.0700421%2C12.3322502 C48.8379789%2C12.0057449 49.5108%2C11.55318 50.0691789%2C10.9870481 C50.6300211%2C10.4188341 51.0790737%2C9.74651689 51.4042105%2C8.98883512 C51.7287789%2C8.23437109 51.8934316%2C7.40968474 51.8934316%2C6.53786806 C51.8934316%2C5.68308643 51.7287789%2C4.86597122 51.4042105%2C4.10847874 C51.0785053%2C3.35174336 50.6292632%2C2.68056187 50.0693684%2C2.11310498%22 id%3D%22Fill-2%22 fill%3D%22%23FFFFFF%22%3E%3C%2Fpath%3E%0D                    %3Cg id%3D%22Group-6%22%3E%0D                        %3Cmask id%3D%22mask-2%22 fill%3D%22white%22%3E%0D                            %3Cuse xlink%3Ahref%3D%22%23path-1%22%3E%3C%2Fuse%3E%0D                        %3C%2Fmask%3E%0D                        %3Cg id%3D%22Clip-4%22%3E%3C%2Fg%3E%0D                        %3Cpath d%3D%22M65.8265684%2C4.00986465 C65.5010526%2C3.25369711 65.052%2C2.58213705 64.4919158%2C2.01449089 C63.9327789%2C1.44741255 63.2603368%2C0.990305019 62.4933474%2C0.656039219 C61.7254105%2C0.322530534 60.8945684%2C0.153504849 60.0235579%2C0.153504849 C59.1523579%2C0.153504849 58.3264421%2C0.322719812 57.5693053%2C0.656039219 C56.8106526%2C0.989169348 56.1378316%2C1.44589833 55.5697895%2C2.01373377 C55.0028842%2C2.58005499 54.5498526%2C3.25161505 54.2233895%2C4.01005392 C53.8971158%2C4.77095342 53.7315158%2C5.58806863 53.7315158%2C6.43925397 L53.7315158%2C17.4136204 L55.8888632%2C17.4136204 L55.8888632%2C6.43925397 C55.8888632%2C5.87293275 55.9957263%2C5.33216412 56.2068%2C4.83227965 C56.4184421%2C4.3305024 56.7128842%2C3.88531941 57.0821684%2C3.50865523 C57.4472842%2C3.13407311 57.8885684%2C2.83633806 58.3942737%2C2.62339976 C58.8922105%2C2.41292209 59.4405474%2C2.30635831 60.0235579%2C2.30635831 C60.5982316%2C2.30635831 61.1244%2C2.41008291 61.6321895%2C2.62339976 C62.1361895%2C2.83577022 62.5814526%2C3.13407311 62.9564211%2C3.51054801 C63.3323368%2C3.8836159 63.6307579%2C4.32823105 63.8433474%2C4.83227965 C64.0542316%2C5.33216412 64.1612842%2C5.87293275 64.1612842%2C6.43925397 C64.1612842%2C7.02147458 64.0542316%2C7.5701929 63.8433474%2C8.06950953 C63.6296211%2C8.57393669 63.3315789%2C9.01381988 62.9568%2C9.37818096 C62.5852421%2C9.74443482 62.1394105%2C10.038195 61.632%2C10.252269 C61.1215579%2C10.4676679 60.5952%2C10.5723389 60.0235579%2C10.5723389 L59.8661053%2C10.5723389 L59.8661053%2C12.7253816 L60.0235579%2C12.7253816 C60.8919158%2C12.7253816 61.7225684%2C12.5599522 62.4924%2C12.2336361 C63.2603368%2C11.90732 63.9329684%2C11.4545659 64.4921053%2C10.888434 C65.0527579%2C10.3198414 65.5018105%2C9.64752424 65.8265684%2C8.89022103 C66.1511368%2C8.13613556 66.3157895%2C7.31125993 66.3157895%2C6.43925397 C66.3157895%2C5.58428306 66.1511368%2C4.76697858 65.8265684%2C4.00986465%22 id%3D%22Fill-3%22 fill%3D%22%23FFFFFF%22 mask%3D%22url(%23mask-2)%22%3E%3C%2Fpath%3E%0D                        %3Cpath d%3D%22M22.6095158%2C4.09901481 L22.6093263%2C4.09901481 C22.2771789%2C3.34549717 21.8199789%2C2.67526207 21.2502316%2C2.10666951 C20.6804842%2C1.53978045 20.0038737%2C1.08475498 19.2395368%2C0.75446403 C18.4719789%2C0.421144623 17.6418947%2C0.252118938 16.7725895%2C0.252118938 C15.6363158%2C0.252118938 14.5892842%2C0.526951295 13.6604842%2C1.06904487 C12.8042526%2C1.57044357 12.0950526%2C2.22326505 11.5489895%2C3.01160993 C11.0260421%2C2.22212938 10.3213895%2C1.56911862 9.45151579%2C1.06828775 C8.50698947%2C0.526762016 7.45294737%2C0.252118938 6.31875789%2C0.252118938 C5.44888421%2C0.252118938 4.6224%2C0.418494724 3.86204211%2C0.746325055 C3.10244211%2C1.07737312 2.42981053%2C1.52937014 1.86252632%2C2.09058084 C1.29827368%2C2.6512237 0.841831579%2C3.32145881 0.505894737%2C4.08311542 C0.199894737%2C4.77890312 0.0320210526%2C5.53185292 0.00606315789%2C6.32379409 L0%2C12.8236172 L2.15469474%2C12.8236172 L2.15734737%2C6.53786806 C2.15734737%2C5.95299755 2.2644%2C5.40465778 2.47547368%2C4.90723393 C2.68616842%2C4.4069709 2.9844%2C3.96595204 3.36183158%2C3.59648044 C3.73831579%2C3.22795524 4.18395789%2C2.9336272 4.68682105%2C2.72201385 C5.18437895%2C2.51115762 5.73347368%2C2.40440456 6.31875789%2C2.40440456 C6.90176842%2C2.40440456 7.45086316%2C2.51115762 7.95088421%2C2.72220313 C8.45298947%2C2.93438431 8.89408421%2C3.22814451 9.26128421%2C3.59496621 C9.63094737%2C3.96689843 9.9252%2C4.40848513 10.1362737%2C4.90780177 C10.3471579%2C5.40465778 10.4538316%2C5.95318682 10.4538316%2C6.53786806 L10.4538316%2C12.8474663 L12.6113684%2C12.8474663 L12.6113684%2C6.53786806 C12.6113684%2C5.95564744 12.7224%2C5.40768624 12.9418105%2C4.90912672 C13.1595158%2C4.40981008 13.4624842%2C3.9680341 13.8414316%2C3.596859 C14.2217053%2C3.2273874 14.6652632%2C2.93287008 15.1601684%2C2.72182457 C15.6518526%2C2.51115762 16.1899579%2C2.40440456 16.7593263%2C2.40440456 C17.3457474%2C2.40440456 17.8969263%2C2.51115762 18.3969474%2C2.72220313 C18.8973474%2C2.9326808 19.3443158%2C3.22681957 19.7245895%2C3.59648044 C20.1046737%2C3.96860194 20.4036632%2C4.40943152 20.6136%2C4.90761249 C20.8263789%2C5.40901119 20.934%2C5.95754023 20.934%2C6.53786806 L20.934%2C12.8474663 L23.0888842%2C12.8474663 L23.0886947%2C6.54524992 C23.0708842%2C5.57974038 22.9185474%2C4.80237365 22.6095158%2C4.09901481%22 id%3D%22Fill-5%22 fill%3D%22%23FFFFFF%22 mask%3D%22url(%23mask-2)%22%3E%3C%2Fpath%3E%0D                    %3C%2Fg%3E%0D                %3C%2Fg%3E%0D            %3C%2Fg%3E%0D        %3C%2Fg%3E%0D    %3C%2Fg%3E%0D%3C%2Fsvg%3E\") left 20px no-repeat;height:100%;width:71px;margin-left:13px;margin-right:6px}.mui-app-header-title{font-size:14px;height:54px;line-height:55px;margin-left:12px}.mui-app-header-actions{height:54px;line-height:52px;margin-left:auto}\n"] }]
        }] });
/* Directives used for sub-content of app header */
class MuiAppHeaderMenuDirective {
}
MuiAppHeaderMenuDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiAppHeaderMenuDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MuiAppHeaderMenuDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.10", type: MuiAppHeaderMenuDirective, selector: "[muiAppHeaderMenu]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiAppHeaderMenuDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[muiAppHeaderMenu]',
                }]
        }] });
class MuiAppHeaderTitleDirective {
}
MuiAppHeaderTitleDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiAppHeaderTitleDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MuiAppHeaderTitleDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.10", type: MuiAppHeaderTitleDirective, selector: "[muiAppHeaderTitle]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiAppHeaderTitleDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[muiAppHeaderTitle]'
                }]
        }] });
class MuiAppHeaderActionsDirective {
}
MuiAppHeaderActionsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiAppHeaderActionsDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MuiAppHeaderActionsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.10", type: MuiAppHeaderActionsDirective, selector: "[muiAppHeaderActions]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiAppHeaderActionsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[muiAppHeaderActions]'
                }]
        }] });

class MuiAppHeaderModule {
}
MuiAppHeaderModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiAppHeaderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MuiAppHeaderModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.10", ngImport: i0, type: MuiAppHeaderModule, declarations: [MuiAppHeaderComponent, MuiAppHeaderMenuDirective, MuiAppHeaderTitleDirective, MuiAppHeaderActionsDirective], imports: [CommonModule], exports: [MuiAppHeaderComponent, MuiAppHeaderMenuDirective, MuiAppHeaderTitleDirective, MuiAppHeaderActionsDirective] });
MuiAppHeaderModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiAppHeaderModule, imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiAppHeaderModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule
                    ],
                    declarations: [MuiAppHeaderComponent, MuiAppHeaderMenuDirective, MuiAppHeaderTitleDirective, MuiAppHeaderActionsDirective],
                    exports: [MuiAppHeaderComponent, MuiAppHeaderMenuDirective, MuiAppHeaderTitleDirective, MuiAppHeaderActionsDirective]
                }]
        }] });

/*
 * Public API Surface of ui-app-header
 */

class MuiPageHeaderComponent {
}
MuiPageHeaderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiPageHeaderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
MuiPageHeaderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: MuiPageHeaderComponent, selector: "mui-page-header", exportAs: ["muiPageHeader"], ngImport: i0, template: "<div class=\"mui-page-header\">\r\n  <div class=\"mui-page-header-content\">\r\n    <div class=\"mui-page-header-title\">\r\n      <ng-content select=\"[muiPageHeaderTitle]\"></ng-content>\r\n    </div>\r\n    <div class=\"mui-page-header-subtitle\">\r\n      <ng-content select=\"[muiPageHeaderSubtitle]\"></ng-content>\r\n    </div>\r\n  </div>\r\n  <div class=\"mui-page-header-actions\">\r\n    <ng-content select=\"[muiPageHeaderActions]\"></ng-content>\r\n  </div>\r\n</div>\r\n", styles: [".mui-page-header{box-shadow:0 0 4px #ccd3df66;min-height:64px;padding:0 12px;position:relative;display:flex;flex-direction:row;box-sizing:border-box}.mui-page-header-content{width:100%;padding-right:24px;min-width:150px;align-self:flex-start}.mui-page-header-title{height:57px;line-height:66px}:host ::ng-deep .mui-page-header-title [muiPageHeaderTitle],:host ::ng-deep .mui-page-header-subtitle [muiPageHeaderSubtitle]{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mui-page-header-actions{height:64px;line-height:64px;white-space:nowrap;align-self:flex-end}:host ::ng-deep .mui-page-header-subtitle .mat-mdc-icon-button{width:24px;height:24px;line-height:24px;padding:2px}:host ::ng-deep .mui-page-header-subtitle .mat-mdc-icon-button .mat-mdc-button-touch-target{display:none}:host ::ng-deep .mui-page-header-subtitle .mat-icon,:host ::ng-deep .mui-page-header-subtitle .mat-mdc-icon-button .mat-icon{font-size:20px;width:20px;height:20px;line-height:20px;vertical-align:text-bottom}:host ::ng-deep .mui-page-header-subtitle .tdw{font-size:18px;line-height:20px;margin-right:3px;vertical-align:text-bottom}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiPageHeaderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mui-page-header', exportAs: 'muiPageHeader', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"mui-page-header\">\r\n  <div class=\"mui-page-header-content\">\r\n    <div class=\"mui-page-header-title\">\r\n      <ng-content select=\"[muiPageHeaderTitle]\"></ng-content>\r\n    </div>\r\n    <div class=\"mui-page-header-subtitle\">\r\n      <ng-content select=\"[muiPageHeaderSubtitle]\"></ng-content>\r\n    </div>\r\n  </div>\r\n  <div class=\"mui-page-header-actions\">\r\n    <ng-content select=\"[muiPageHeaderActions]\"></ng-content>\r\n  </div>\r\n</div>\r\n", styles: [".mui-page-header{box-shadow:0 0 4px #ccd3df66;min-height:64px;padding:0 12px;position:relative;display:flex;flex-direction:row;box-sizing:border-box}.mui-page-header-content{width:100%;padding-right:24px;min-width:150px;align-self:flex-start}.mui-page-header-title{height:57px;line-height:66px}:host ::ng-deep .mui-page-header-title [muiPageHeaderTitle],:host ::ng-deep .mui-page-header-subtitle [muiPageHeaderSubtitle]{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mui-page-header-actions{height:64px;line-height:64px;white-space:nowrap;align-self:flex-end}:host ::ng-deep .mui-page-header-subtitle .mat-mdc-icon-button{width:24px;height:24px;line-height:24px;padding:2px}:host ::ng-deep .mui-page-header-subtitle .mat-mdc-icon-button .mat-mdc-button-touch-target{display:none}:host ::ng-deep .mui-page-header-subtitle .mat-icon,:host ::ng-deep .mui-page-header-subtitle .mat-mdc-icon-button .mat-icon{font-size:20px;width:20px;height:20px;line-height:20px;vertical-align:text-bottom}:host ::ng-deep .mui-page-header-subtitle .tdw{font-size:18px;line-height:20px;margin-right:3px;vertical-align:text-bottom}\n"] }]
        }] });
/* directives used for page header */
/**
 * Directive for page header title
 */
class MuiPageHeaderTitleDirective {
}
MuiPageHeaderTitleDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiPageHeaderTitleDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MuiPageHeaderTitleDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.10", type: MuiPageHeaderTitleDirective, selector: "[muiPageHeaderTitle]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiPageHeaderTitleDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[muiPageHeaderTitle]'
                }]
        }] });
/**
 * Directive for page header subtitle, placed below title
 */
class MuiPageHeaderSubtitleDirective {
}
MuiPageHeaderSubtitleDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiPageHeaderSubtitleDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MuiPageHeaderSubtitleDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.10", type: MuiPageHeaderSubtitleDirective, selector: "[muiPageHeaderSubtitle]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiPageHeaderSubtitleDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[muiPageHeaderSubtitle]'
                }]
        }] });
/**
 * Directive for page header actions, placed on the right side
 */
class MuiPageHeaderActionsDirective {
}
MuiPageHeaderActionsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiPageHeaderActionsDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MuiPageHeaderActionsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.10", type: MuiPageHeaderActionsDirective, selector: "[muiPageHeaderActions]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiPageHeaderActionsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[muiPageHeaderActions]'
                }]
        }] });

class MuiPageHeaderModule {
}
MuiPageHeaderModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiPageHeaderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MuiPageHeaderModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.10", ngImport: i0, type: MuiPageHeaderModule, declarations: [MuiPageHeaderComponent, MuiPageHeaderActionsDirective,
        MuiPageHeaderTitleDirective, MuiPageHeaderSubtitleDirective], imports: [CommonModule], exports: [MuiPageHeaderComponent, MuiPageHeaderActionsDirective,
        MuiPageHeaderTitleDirective, MuiPageHeaderSubtitleDirective] });
MuiPageHeaderModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiPageHeaderModule, imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiPageHeaderModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule
                    ],
                    exports: [
                        MuiPageHeaderComponent, MuiPageHeaderActionsDirective,
                        MuiPageHeaderTitleDirective, MuiPageHeaderSubtitleDirective
                    ],
                    declarations: [
                        MuiPageHeaderComponent, MuiPageHeaderActionsDirective,
                        MuiPageHeaderTitleDirective, MuiPageHeaderSubtitleDirective
                    ]
                }]
        }] });

/*
 * Public API Surface of ui-page-header
 */

class MuiHeadernavService {
    constructor(http) {
        this.http = http;
    }
    getNavigationItems(apiUrl) {
        return this.http.get(apiUrl);
    }
}
MuiHeadernavService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiHeadernavService, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable });
MuiHeadernavService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiHeadernavService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiHeadernavService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }]; } });

class HeadernavDialogComponent {
    constructor(data, sanitizer, http, cd) {
        this.data = data;
        this.sanitizer = sanitizer;
        this.http = http;
        this.cd = cd;
        this.useIframe = false;
    }
    ngOnInit() {
        this.contentSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.data.href);
        if (this.data.modal.iframe) {
            this.useIframe = true;
        }
        else {
            this.http.get(this.data.href, { responseType: 'text' }).subscribe(content => {
                this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(content);
                this.cd.detectChanges();
            });
        }
    }
}
HeadernavDialogComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: HeadernavDialogComponent, deps: [{ token: MAT_DIALOG_DATA }, { token: i1$1.DomSanitizer }, { token: i1.HttpClient }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
HeadernavDialogComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: HeadernavDialogComponent, selector: "ng-component", ngImport: i0, template: "<h2 mat-dialog-title>{{ data.modal.title }}</h2>\r\n<mat-dialog-content>\r\n  <iframe *ngIf=\"useIframe\" [src]=\"contentSrc\" frameborder=\"0\" class=\"dialog-iframe\"></iframe>\r\n  <div *ngIf=\"!useIframe\">\r\n    <div [innerHTML]=\"htmlContent\"></div>\r\n  </div>\r\n</mat-dialog-content>\r\n<mat-dialog-actions align=\"end\">\r\n  <button mat-button color=\"primary\" mat-dialog-close>Close</button>\r\n</mat-dialog-actions>\r\n", styles: [".modal-m{width:510px;height:590px}.modal-mdl{width:700px;height:640px}.modal-xl{width:1050px;height:680px}.dialog-iframe{width:100%}.modal-m .dialog-iframe{height:450px}.modal-mdl .dialog-iframe{height:500px}.modal-xl .dialog-iframe{height:550px}\n"], dependencies: [{ kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i6.MatButton, selector: "    button[mat-button], button[mat-raised-button], button[mat-flat-button],    button[mat-stroked-button]  ", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "directive", type: i2.MatDialogClose, selector: "[mat-dialog-close], [matDialogClose]", inputs: ["aria-label", "type", "mat-dialog-close", "matDialogClose"], exportAs: ["matDialogClose"] }, { kind: "directive", type: i2.MatDialogTitle, selector: "[mat-dialog-title], [matDialogTitle]", inputs: ["id"], exportAs: ["matDialogTitle"] }, { kind: "directive", type: i2.MatDialogContent, selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]" }, { kind: "directive", type: i2.MatDialogActions, selector: "[mat-dialog-actions], mat-dialog-actions, [matDialogActions]", inputs: ["align"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: HeadernavDialogComponent, decorators: [{
            type: Component,
            args: [{ encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<h2 mat-dialog-title>{{ data.modal.title }}</h2>\r\n<mat-dialog-content>\r\n  <iframe *ngIf=\"useIframe\" [src]=\"contentSrc\" frameborder=\"0\" class=\"dialog-iframe\"></iframe>\r\n  <div *ngIf=\"!useIframe\">\r\n    <div [innerHTML]=\"htmlContent\"></div>\r\n  </div>\r\n</mat-dialog-content>\r\n<mat-dialog-actions align=\"end\">\r\n  <button mat-button color=\"primary\" mat-dialog-close>Close</button>\r\n</mat-dialog-actions>\r\n", styles: [".modal-m{width:510px;height:590px}.modal-mdl{width:700px;height:640px}.modal-xl{width:1050px;height:680px}.dialog-iframe{width:100%}.modal-m .dialog-iframe{height:450px}.modal-mdl .dialog-iframe{height:500px}.modal-xl .dialog-iframe{height:550px}\n"] }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_DIALOG_DATA]
                }] }, { type: i1$1.DomSanitizer }, { type: i1.HttpClient }, { type: i0.ChangeDetectorRef }]; } });

let SessionTimerService$1 = class SessionTimerService {
    constructor(http, notificationService) {
        this.http = http;
        this.notificationService = notificationService;
    }
    keepAlive() {
        return this.doRequest(new HttpParams().set('keepAlive', 'true'));
    }
    stopKeepAlive() {
        return this.doRequest(new HttpParams().set('keepAlive', 'false'));
    }
    ping() {
        return this.doRequest();
    }
    sessionTimedOut(message) {
        if (this.notificationService) {
            const notification = {
                type: 'WARNING',
                message: {
                    headline: message
                }
            };
            this.notificationService.addNotification(notification);
        }
    }
    idleModeActivated(message) {
        if (this.notificationService) {
            const notification = {
                type: 'WARNING',
                message: {
                    headline: message
                }
            };
            this.notificationService.addNotification(notification);
        }
    }
    doRequest(params) {
        const isValid = this.endpointUrl !== undefined && this.endpointUrl.length > 0;
        if (!isValid) {
            console.warn('Endpoint url for session timer is empty. Please check configuration');
            return EMPTY;
        }
        if (params) {
            return this.http.get(this.endpointUrl, { params });
        }
        return this.http.get(this.endpointUrl);
    }
};
SessionTimerService$1.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: SessionTimerService$1, deps: [{ token: i1.HttpClient }, { token: i3.NotificationService, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
SessionTimerService$1.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: SessionTimerService$1 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: SessionTimerService$1, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i3.NotificationService, decorators: [{
                    type: Optional
                }] }]; } });

class SessionTimerComponent {
    constructor(service) {
        this.service = service;
        this.trackClicks = false;
        this.timerCountdown = interval(1000);
    }
    ngOnInit() {
        if (this.navItem) {
            this.sessionTime = new Date(this.navItem.timeout);
            this.service.endpointUrl = this.navItem.href;
            if (this.navItem.keepAlive && !this.navItem.idleMode) {
                this.startKeepAlive();
            }
            else {
                this.startTimer();
            }
            if (this.navItem.idleMode) {
                this.onIdleModeActivated();
            }
        }
        if (this.trackClicks) {
            this.startClickTracker();
        }
    }
    startTimer() {
        // TODO review if there is more elegant handling using additional rxjs operators
        this.timer = this.timerCountdown.subscribe(() => {
            const tick = this.sessionTime.getTime() - 1000;
            this.sessionTime = new Date(tick);
            if (tick === 0) {
                this.timer.unsubscribe();
                this.service.sessionTimedOut(this.navItem.expiredMsg);
                if (typeof this.navItem.expiredHref === 'string') {
                    setTimeout(() => {
                        window.location.assign(this.navItem.expiredHref);
                    }, 5000);
                }
            }
        });
        if (this.activeKeepAlive && !this.activeKeepAlive.closed) {
            this.stopKeepAlive();
        }
    }
    stopAndResetTimer() {
        this.timer.unsubscribe();
        this.resetTimer();
        this.startKeepAlive();
    }
    onIdleModeActivated() {
        // console.log('Idle mode activated...');
        this.service.idleModeActivated(this.navItem.idleModeMsg);
    }
    startClickTracker() {
        // console.log('start tracking clicks');
        const clickCheckInterval = this.navItem.timeout / 200;
        const clicks = fromEvent(document, 'click');
        this.activeClickTracker = clicks.pipe(debounceTime(clickCheckInterval)).subscribe(() => {
            this.resetTimer();
            this.service.ping().subscribe();
            // console.log('timer reset because of clicks');
        });
    }
    stopClickTracker() {
        // console.log('stop tracking clicks');
        this.activeClickTracker.unsubscribe();
    }
    resetTimer() {
        this.sessionTime = new Date(this.navItem.timeout);
    }
    startKeepAlive() {
        // console.log('starting keepalive');
        this.activeKeepAlive = timer(10, 30000).subscribe(() => {
            this.service.keepAlive().subscribe(res => {
                if (res.idleMode === true) {
                    this.onIdleModeActivated();
                    this.startTimer();
                }
            });
        });
        // stop the clicktracker while keepalive is enabled
        if (this.trackClicks && this.activeClickTracker) {
            this.stopClickTracker();
        }
    }
    stopKeepAlive() {
        // console.log('stopping keepalive!');
        this.activeKeepAlive.unsubscribe();
        this.service.stopKeepAlive().subscribe();
        // start click tracker again if needed
        if (this.trackClicks) {
            this.startClickTracker();
        }
    }
}
SessionTimerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: SessionTimerComponent, deps: [{ token: SessionTimerService$1 }], target: i0.ɵɵFactoryTarget.Component });
SessionTimerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: SessionTimerComponent, selector: "mui-session-timer", inputs: { navItem: "navItem", trackClicks: "trackClicks" }, providers: [SessionTimerService$1], exportAs: ["muiSessionTimer"], ngImport: i0, template: "<button *ngIf=\"timer && !timer.closed\" mat-icon-button class=\"text-nav-button session-timer-button\"\r\n  (click)=\"stopAndResetTimer()\">\r\n  <span class=\"button-text\">{{ sessionTime | date:'mm:ss' }}</span>\r\n  <mat-icon class=\"stop-timer-icon\">timer_off</mat-icon>\r\n</button>\r\n<button *ngIf=\"!timer || timer.closed\" mat-icon-button (click)=\"startTimer()\">\r\n  <mat-icon>timer</mat-icon>\r\n</button>\r\n\r\n", styles: [".stop-timer-icon{width:16px;font-size:16px;margin-left:2px}.session-timer-button{width:85px;height:40px;font-size:14px;font-weight:300;vertical-align:middle;cursor:pointer}.button-text{position:relative;top:1px}\n"], dependencies: [{ kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3$1.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "component", type: i6.MatIconButton, selector: "button[mat-icon-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "pipe", type: i4.DatePipe, name: "date" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: SessionTimerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mui-session-timer', exportAs: 'muiSessionTimer', providers: [SessionTimerService$1], template: "<button *ngIf=\"timer && !timer.closed\" mat-icon-button class=\"text-nav-button session-timer-button\"\r\n  (click)=\"stopAndResetTimer()\">\r\n  <span class=\"button-text\">{{ sessionTime | date:'mm:ss' }}</span>\r\n  <mat-icon class=\"stop-timer-icon\">timer_off</mat-icon>\r\n</button>\r\n<button *ngIf=\"!timer || timer.closed\" mat-icon-button (click)=\"startTimer()\">\r\n  <mat-icon>timer</mat-icon>\r\n</button>\r\n\r\n", styles: [".stop-timer-icon{width:16px;font-size:16px;margin-left:2px}.session-timer-button{width:85px;height:40px;font-size:14px;font-weight:300;vertical-align:middle;cursor:pointer}.button-text{position:relative;top:1px}\n"] }]
        }], ctorParameters: function () { return [{ type: SessionTimerService$1 }]; }, propDecorators: { navItem: [{
                type: Input
            }], trackClicks: [{
                type: Input
            }] } });

/**
 * Component which handles the navigation in the app header
 * @deprecated
 */
class MuiHeadernavComponent {
    constructor(headernavService, dialog, notificationService) {
        this.headernavService = headernavService;
        this.dialog = dialog;
        this.notificationService = notificationService;
        /**
         * Flag to control the behavior when one of the items in the language menu is clicked.
         * If false (default), the language link will be executed, redirecting to CEP start page and activating new language.
         * If true, the language link will not be followed. Instead output event languageChanged will be fired.
         * see languageChanged
         */
        this.handleLanguageChange = false;
        /**
         * Control flag for the session timer.
         * If false (default), timer will only be refreshed when component initializes (i.e. page reload)
         * If true, user clicks will be monitored and used to reset the timer at certain intervals.
         */
        this.trackClicks = false; // for session timer
        /**
         * Output event which emits when a new language has been selected in the language picker menu and
         * handleLanguageChange is enabled.
         * Emits the locale string as payload.
         * see handleLanguageChange
         */
        this.languageChanged = new EventEmitter();
        this.searchFieldHidden = true;
        this.notificationCenterEnabled = false;
        this.helpLinkChanges = new Subject();
        this.initialized$ = new Subject();
    }
    ngOnChanges(changes) {
        if (changes['helpTopicId'] && changes['helpTopicId'].currentValue) {
            this.updateHelpLink(changes['helpTopicId'].currentValue);
        }
    }
    ngOnInit() {
        if (this.apiUrl) {
            this.headernavService
                .getNavigationItems(this.apiUrl)
                .subscribe(data => {
                this.navItems = data.topNav;
                this.initialized$.complete();
            });
            this.onHelpLinkChanges();
        }
        else {
            console.warn('MuiHeadernavConponent: No value set for [apiUrl]. No topnav items will be generated.');
        }
        if (this.notificationService && this.notificationCenter) {
            this.notificationCount = this.notificationService.unseenCounter;
            this.notificationBadgeHidden = this.notificationService.unseenCounter.pipe(map(x => x === 0));
            this.notificationCenterEnabled = true;
        }
        else {
            this.notificationCount = EMPTY;
        }
    }
    menuItemClicked($event, item) {
        if (item.blank) {
            $event.preventDefault();
            window.open(item.href);
        }
        else if (this.handleLanguageChange && typeof item.locale === 'string') {
            $event.preventDefault();
            this.languageChanged.emit(item.locale);
        }
        else if (typeof item.modal === 'object') {
            $event.preventDefault();
            this.createModal(item);
        }
    }
    toggleNotificationPanel() {
        if (this.notificationCenterEnabled) {
            this.notificationCenter.toggleState();
        }
    }
    onSearchTermEntered(searchTerm, searchUrl) {
        const searchQuery = searchUrl + encodeURIComponent(searchTerm);
        window.location.assign(searchQuery);
    }
    /**
     * Updates the help link to point to a new help topic
     * @param helpKey The new help key to assign to the link
     */
    updateHelpLink(helpKey) {
        this.helpLinkChanges.next(helpKey);
    }
    onHelpLinkChanges() {
        this.helpLinkChanges.pipe(debounce(() => this.initialized$))
            .subscribe(helpKey => {
            const helpSection = this.navItems.find((value) => value.type === 'help');
            if (helpSection) {
                const helpLinkItem = helpSection.menu.find((value) => value.id === 'tn-help-onlinehelp');
                if (helpLinkItem) {
                    try {
                        const helpUrl = new URL(helpLinkItem.href);
                        if (helpUrl.searchParams.get('label') !== null) {
                            helpUrl.searchParams.set('label', `Engage_${helpKey}`);
                            helpUrl.hash = '';
                        }
                        else {
                            // TODO old help link, remove after migration done
                            helpUrl.hash = helpKey;
                        }
                        helpLinkItem.href = helpUrl.toString();
                    }
                    catch (e) {
                        console.error('failed parsing help url', e);
                    }
                }
            }
        });
    }
    createModal(item) {
        this.dialog.open(HeadernavDialogComponent, {
            data: item,
            panelClass: item.modal.class
        });
    }
}
MuiHeadernavComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiHeadernavComponent, deps: [{ token: MuiHeadernavService }, { token: i2.MatDialog }, { token: i3.NotificationService, optional: true }], target: i0.ɵɵFactoryTarget.Component });
MuiHeadernavComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: MuiHeadernavComponent, selector: "mui-headernav", inputs: { apiUrl: "apiUrl", handleLanguageChange: "handleLanguageChange", notificationCenter: "notificationCenter", trackClicks: "trackClicks", helpTopicId: "helpTopicId" }, outputs: { languageChanged: "languageChanged" }, providers: [MuiHeadernavService], exportAs: ["muiHeaderNav"], usesOnChanges: true, ngImport: i0, template: "<ng-container *ngFor=\"let item of navItems\">\r\n\r\n  <ng-container [ngSwitch]=\"item['type']\">\r\n    <div class=\"search-container\" *ngSwitchCase=\"'search'\">\r\n      <div class=\"search-controls\" [class.hidden]=\"searchFieldHidden\">\r\n      <button mat-icon-button (click)=\"searchFieldHidden = !searchFieldHidden\">\r\n        <mat-icon>search</mat-icon>\r\n      </button>\r\n      <mat-form-field class=\"search-field\">\r\n        <input type=\"text\" matInput #search (keyup.enter)=\"onSearchTermEntered(search.value, item.href)\"/>\r\n        <button mat-button matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"search.value = ''\">\r\n          <mat-icon class=\"search-clear-icon\">close</mat-icon>\r\n        </button>\r\n      </mat-form-field>\r\n      </div>\r\n    </div>\r\n\r\n    <ng-container *ngSwitchCase=\"'notification'\">\r\n      <button mat-icon-button *ngIf=\"notificationCenterEnabled\" (click)=\"toggleNotificationPanel()\">\r\n        <mat-icon class=\"nc-notification-icon\" [matBadge]=\"notificationCount | async\"\r\n          [matBadgeHidden]=\"notificationBadgeHidden | async\" matBadgeColor=\"warn\">notifications</mat-icon>\r\n      </button>\r\n    </ng-container>\r\n\r\n    <ng-container *ngSwitchCase=\"'help'\">\r\n      <button mat-icon-button [matMenuTriggerFor]=\"helpMenu\">\r\n        <mat-icon>help</mat-icon>\r\n      </button>\r\n      <mat-menu #helpMenu=\"matMenu\" [overlapTrigger]=\"false\">\r\n        <a *ngFor=\"let menuItem of item.menu\" mat-menu-item [href]=\"menuItem.href\"\r\n          (click)=\"menuItemClicked($event, menuItem)\">{{ menuItem.name }}</a>\r\n      </mat-menu>\r\n    </ng-container>\r\n\r\n    <ng-container *ngSwitchCase=\"'appSwitcher'\">\r\n      <button mat-icon-button [matMenuTriggerFor]=\"appsMenu\">\r\n        <mat-icon>apps</mat-icon>\r\n      </button>\r\n      <mat-menu #appsMenu=\"matMenu\" [overlapTrigger]=\"false\">\r\n        <a *ngFor=\"let menuItem of item.menu\" mat-menu-item [href]=\"menuItem.href\"\r\n          (click)=\"menuItemClicked($event, menuItem)\">{{ menuItem.name }}</a>\r\n      </mat-menu>\r\n    </ng-container>\r\n\r\n    <ng-container *ngSwitchCase=\"'langSwitcher'\">\r\n      <button mat-icon-button [matMenuTriggerFor]=\"langMenu\" class=\"text-nav-button\">\r\n        <span class=\"button-text\">{{ item.name }}</span>\r\n      </button>\r\n      <mat-menu #langMenu=\"matMenu\" [overlapTrigger]=\"false\">\r\n        <a *ngFor=\"let menuItem of item.menu\" mat-menu-item [href]=\"menuItem.href\"\r\n          (click)=\"menuItemClicked($event, menuItem)\">{{ menuItem.name }}</a>\r\n      </mat-menu>\r\n    </ng-container>\r\n\r\n    <mui-session-timer *ngSwitchCase=\"'sessionTimer'\" [navItem]=\"item\" [trackClicks]=\"trackClicks\">\r\n    </mui-session-timer>\r\n\r\n    <ng-container *ngSwitchCase=\"'user'\">\r\n      <button mat-icon-button [matMenuTriggerFor]=\"userMenu\">\r\n        <mat-icon>person</mat-icon>\r\n      </button>\r\n      <mat-menu #userMenu=\"matMenu\" [overlapTrigger]=\"false\">\r\n        <a *ngFor=\"let menuItem of item.menu\" mat-menu-item [href]=\"menuItem.href\"\r\n          (click)=\"menuItemClicked($event, menuItem)\">{{ menuItem.name }}</a>\r\n      </mat-menu>\r\n    </ng-container>\r\n\r\n  </ng-container>\r\n</ng-container>\r\n", styles: [".search-field{background-color:#fff;color:#000000de;padding:0 5px;height:52px;width:200px}.search-clear-icon{color:#000000de;line-height:inherit!important}.text-nav-button{font-size:16px;font-weight:400;vertical-align:middle;cursor:pointer}.search-container{position:relative;display:inline-block;overflow:hidden;vertical-align:middle}.search-controls{position:relative;display:inline-block;right:0;transition:.4s ease}.search-controls.hidden{right:-210px}\n"], dependencies: [{ kind: "directive", type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i4.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i4.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "component", type: i3$1.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "component", type: i6.MatButton, selector: "    button[mat-button], button[mat-raised-button], button[mat-flat-button],    button[mat-stroked-button]  ", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "component", type: i6.MatIconButton, selector: "button[mat-icon-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "component", type: i5.MatMenu, selector: "mat-menu", exportAs: ["matMenu"] }, { kind: "component", type: i5.MatMenuItem, selector: "[mat-menu-item]", inputs: ["disabled", "disableRipple", "role"], exportAs: ["matMenuItem"] }, { kind: "directive", type: i5.MatMenuTrigger, selector: "[mat-menu-trigger-for], [matMenuTriggerFor]", exportAs: ["matMenuTrigger"] }, { kind: "directive", type: i8.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { kind: "component", type: i8$1.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i8$1.MatSuffix, selector: "[matSuffix], [matIconSuffix], [matTextSuffix]", inputs: ["matTextSuffix"] }, { kind: "directive", type: i10.MatBadge, selector: "[matBadge]", inputs: ["matBadgeDisabled", "matBadgeColor", "matBadgeOverlap", "matBadgePosition", "matBadge", "matBadgeDescription", "matBadgeSize", "matBadgeHidden"] }, { kind: "component", type: SessionTimerComponent, selector: "mui-session-timer", inputs: ["navItem", "trackClicks"], exportAs: ["muiSessionTimer"] }, { kind: "pipe", type: i4.AsyncPipe, name: "async" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiHeadernavComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mui-headernav', exportAs: 'muiHeaderNav', providers: [MuiHeadernavService], template: "<ng-container *ngFor=\"let item of navItems\">\r\n\r\n  <ng-container [ngSwitch]=\"item['type']\">\r\n    <div class=\"search-container\" *ngSwitchCase=\"'search'\">\r\n      <div class=\"search-controls\" [class.hidden]=\"searchFieldHidden\">\r\n      <button mat-icon-button (click)=\"searchFieldHidden = !searchFieldHidden\">\r\n        <mat-icon>search</mat-icon>\r\n      </button>\r\n      <mat-form-field class=\"search-field\">\r\n        <input type=\"text\" matInput #search (keyup.enter)=\"onSearchTermEntered(search.value, item.href)\"/>\r\n        <button mat-button matSuffix mat-icon-button aria-label=\"Clear\" (click)=\"search.value = ''\">\r\n          <mat-icon class=\"search-clear-icon\">close</mat-icon>\r\n        </button>\r\n      </mat-form-field>\r\n      </div>\r\n    </div>\r\n\r\n    <ng-container *ngSwitchCase=\"'notification'\">\r\n      <button mat-icon-button *ngIf=\"notificationCenterEnabled\" (click)=\"toggleNotificationPanel()\">\r\n        <mat-icon class=\"nc-notification-icon\" [matBadge]=\"notificationCount | async\"\r\n          [matBadgeHidden]=\"notificationBadgeHidden | async\" matBadgeColor=\"warn\">notifications</mat-icon>\r\n      </button>\r\n    </ng-container>\r\n\r\n    <ng-container *ngSwitchCase=\"'help'\">\r\n      <button mat-icon-button [matMenuTriggerFor]=\"helpMenu\">\r\n        <mat-icon>help</mat-icon>\r\n      </button>\r\n      <mat-menu #helpMenu=\"matMenu\" [overlapTrigger]=\"false\">\r\n        <a *ngFor=\"let menuItem of item.menu\" mat-menu-item [href]=\"menuItem.href\"\r\n          (click)=\"menuItemClicked($event, menuItem)\">{{ menuItem.name }}</a>\r\n      </mat-menu>\r\n    </ng-container>\r\n\r\n    <ng-container *ngSwitchCase=\"'appSwitcher'\">\r\n      <button mat-icon-button [matMenuTriggerFor]=\"appsMenu\">\r\n        <mat-icon>apps</mat-icon>\r\n      </button>\r\n      <mat-menu #appsMenu=\"matMenu\" [overlapTrigger]=\"false\">\r\n        <a *ngFor=\"let menuItem of item.menu\" mat-menu-item [href]=\"menuItem.href\"\r\n          (click)=\"menuItemClicked($event, menuItem)\">{{ menuItem.name }}</a>\r\n      </mat-menu>\r\n    </ng-container>\r\n\r\n    <ng-container *ngSwitchCase=\"'langSwitcher'\">\r\n      <button mat-icon-button [matMenuTriggerFor]=\"langMenu\" class=\"text-nav-button\">\r\n        <span class=\"button-text\">{{ item.name }}</span>\r\n      </button>\r\n      <mat-menu #langMenu=\"matMenu\" [overlapTrigger]=\"false\">\r\n        <a *ngFor=\"let menuItem of item.menu\" mat-menu-item [href]=\"menuItem.href\"\r\n          (click)=\"menuItemClicked($event, menuItem)\">{{ menuItem.name }}</a>\r\n      </mat-menu>\r\n    </ng-container>\r\n\r\n    <mui-session-timer *ngSwitchCase=\"'sessionTimer'\" [navItem]=\"item\" [trackClicks]=\"trackClicks\">\r\n    </mui-session-timer>\r\n\r\n    <ng-container *ngSwitchCase=\"'user'\">\r\n      <button mat-icon-button [matMenuTriggerFor]=\"userMenu\">\r\n        <mat-icon>person</mat-icon>\r\n      </button>\r\n      <mat-menu #userMenu=\"matMenu\" [overlapTrigger]=\"false\">\r\n        <a *ngFor=\"let menuItem of item.menu\" mat-menu-item [href]=\"menuItem.href\"\r\n          (click)=\"menuItemClicked($event, menuItem)\">{{ menuItem.name }}</a>\r\n      </mat-menu>\r\n    </ng-container>\r\n\r\n  </ng-container>\r\n</ng-container>\r\n", styles: [".search-field{background-color:#fff;color:#000000de;padding:0 5px;height:52px;width:200px}.search-clear-icon{color:#000000de;line-height:inherit!important}.text-nav-button{font-size:16px;font-weight:400;vertical-align:middle;cursor:pointer}.search-container{position:relative;display:inline-block;overflow:hidden;vertical-align:middle}.search-controls{position:relative;display:inline-block;right:0;transition:.4s ease}.search-controls.hidden{right:-210px}\n"] }]
        }], ctorParameters: function () { return [{ type: MuiHeadernavService }, { type: i2.MatDialog }, { type: i3.NotificationService, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { apiUrl: [{
                type: Input
            }], handleLanguageChange: [{
                type: Input
            }], notificationCenter: [{
                type: Input
            }], trackClicks: [{
                type: Input
            }], helpTopicId: [{
                type: Input
            }], languageChanged: [{
                type: Output
            }] } });

/**
 * Container component for the main app content area
 * @deprecated
 */
class MuiLeftnavContentComponent {
    constructor() {
        this.hostElementClass = 'mui-leftnav-content';
        this.isContentPushed = false;
    }
}
MuiLeftnavContentComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiLeftnavContentComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
MuiLeftnavContentComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: MuiLeftnavContentComponent, selector: "mui-leftnav-content", host: { properties: { "class": "this.hostElementClass", "class.pushed": "this.isContentPushed" } }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiLeftnavContentComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mui-leftnav-content',
                    template: '<ng-content></ng-content>',
                    encapsulation: ViewEncapsulation.None
                }]
        }], propDecorators: { hostElementClass: [{
                type: HostBinding,
                args: ['class']
            }], isContentPushed: [{
                type: HostBinding,
                args: ['class.pushed']
            }] } });

class MuiLeftnavService {
    constructor(http) {
        this.http = http;
        this.sessionStorageKey = 'cepLeftnavActive'; // TODO consider rename prefix
    }
    getNavigationItems(apiUrl) {
        return this.http.get(apiUrl);
    }
    loadSavedActiveNavItems() {
        if (!sessionStorage) {
            return null;
        }
        return JSON.parse(window.sessionStorage.getItem(this.sessionStorageKey) ?? 'null');
    }
    saveActiveNavItems(activeItem) {
        if (window.sessionStorage) {
            window.sessionStorage.setItem(this.sessionStorageKey, JSON.stringify(activeItem));
        }
    }
}
MuiLeftnavService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiLeftnavService, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable });
MuiLeftnavService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiLeftnavService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiLeftnavService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }]; } });

/**
 * Component which handles the left-side navigation menu
 * @deprecated
 */
class MuiLeftnavComponent {
    constructor(leftNavService, router) {
        this.leftNavService = leftNavService;
        this.router = router;
        this.subNavSwitchDelay = 500;
        /**
         * Output event which emits when the left nav panel exapnds or collapses
         */
        this.navExpanded = new EventEmitter();
        this.mainNavState = 'collapsed';
        this.subPanelOpen = false;
        // the currently active main item (hover state)
        this.activeMainItem = '';
        this.highlightedMainItem = '';
        this.navMouseEvents = new Subject();
        this.menuLabel = {
            id: 'mm-menu',
            name: 'Menu'
        };
    }
    ngOnInit() {
        if (this.apiUrl) {
            this.leftNavService.getNavigationItems(this.apiUrl).subscribe(data => {
                this.navItems = data.mainNav;
                this.loadSavedActiveNavItems();
            });
        }
        else {
            console.warn('MuiLeftnavConponent: No value set for [apiUrl]. No nav items will be generated.');
        }
        this.navMouseEvents.pipe(debounceTime(this.subNavSwitchDelay)).subscribe(e => this.onNavMouseEvent(e));
    }
    toggleState() {
        this.mainNavState = this.mainNavState === 'collapsed' ? 'expanded' : 'collapsed';
        this.navExpanded.emit(this.mainNavState === 'expanded');
    }
    onEnterMainItem(item) {
        this.navMouseEvents.next({ event: 'enter', item });
    }
    onMouseLeaveNav() {
        this.navMouseEvents.next({ event: 'leave' });
    }
    setActivePage(sectionId, pageId, href) {
        const activePage = {
            section: sectionId,
            page: pageId ? pageId : null
        };
        this.leftNavService.saveActiveNavItems(activePage);
        if (href) {
            // try to handle relative links using the router
            // use location assignment for absolute urls or when no router is available
            if (href.match(/https?:\/\//) || !this.router) {
                window.location.assign(href);
            }
            else {
                this.router.navigate([href]);
                this.highlightedMainItem = sectionId;
                this.highlightedSubMenuItem = pageId;
            }
        }
    }
    onNavMouseEvent(e) {
        if (e.event === 'enter' && e.item) {
            this.activeMainItem = e.item.id;
            this.subPanelOpen = typeof e.item.menu === 'object';
        }
        else {
            this.subPanelOpen = false;
            this.activeMainItem = '';
        }
    }
    loadSavedActiveNavItems() {
        const cepNavActive = this.leftNavService.loadSavedActiveNavItems();
        // look for saved entries from sesstion storage
        if (cepNavActive !== null) {
            const activeSection = this.navItems.find(item => item.id === cepNavActive.section);
            if (activeSection) {
                this.highlightedMainItem = activeSection.id;
                if (activeSection.menu) {
                    const activePage = activeSection.menu.find(item => item.id === cepNavActive.page);
                    if (activePage) {
                        this.highlightedSubMenuItem = activePage.id;
                    }
                }
            }
        }
        // if the router is configured, additionally match against the current url and find corresponding items to highlight
        // this will give correct highlight in case of manual entered urls or bookmarks
        if (this.router) {
            this.navItems.find(item => {
                if (item.href === this.router.url) {
                    this.highlightedMainItem = item.id;
                    this.highlightedSubMenuItem = undefined;
                    return true;
                }
                else if (item.menu) {
                    const subItem = item.menu.find(subitem => subitem.href === this.router.url);
                    if (subItem) {
                        this.highlightedSubMenuItem = subItem.id;
                        this.highlightedMainItem = item.id;
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else {
                    return false;
                }
            });
        }
    }
}
MuiLeftnavComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiLeftnavComponent, deps: [{ token: MuiLeftnavService }, { token: i2$1.Router, optional: true }], target: i0.ɵɵFactoryTarget.Component });
MuiLeftnavComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: MuiLeftnavComponent, selector: "mui-leftnav", inputs: { apiUrl: "apiUrl", subNavSwitchDelay: "subNavSwitchDelay" }, outputs: { navExpanded: "navExpanded" }, providers: [MuiLeftnavService], exportAs: ["muiLeftnav"], ngImport: i0, template: "<nav class=\"leftnav-container\" (mouseleave)=\"onMouseLeaveNav()\">\r\n  <ul class=\"leftnav-main\" [@mainNavState]=\"mainNavState\">\r\n    <li>\r\n      <button mat-button class=\"nav-item main\" (click)=\"toggleState()\">\r\n        <mat-icon class=\"nav-item-icon\">menu</mat-icon>\r\n        &nbsp;\r\n      </button>\r\n    </li>\r\n    <!-- main menu --->\r\n    <li *ngFor=\"let item of navItems\" (mouseenter)=\"onEnterMainItem(item)\">\r\n      <button mat-button class=\"nav-item main\" [class.active]=\"item.id === activeMainItem\"\r\n        [class.highlight]=\"item.id === highlightedMainItem\"\r\n        (click)=\"setActivePage(item.id, undefined, item.href)\">\r\n        <mat-icon class=\"nav-item-icon\">{{ item.matIcon }}</mat-icon>\r\n        {{ item.name }}\r\n        <mat-icon class=\"nav-item-submenu-indicator\" *ngIf=\"item.menu\">chevron_right</mat-icon>\r\n      </button>\r\n    </li>\r\n  </ul>\r\n  <!-- 2nd level menu -->\r\n  <ul class=\"leftnav-sub\" [class.open]=\"subPanelOpen\">\r\n    <li *ngFor=\"let item of navItems\">\r\n      <ul *ngIf=\"item.menu\" class=\"submenu\" [class.active]=\"activeMainItem === item.id\">\r\n        <li class=\"subnav-header\"><h5>{{ item.name }}</h5></li>\r\n        <li *ngFor=\"let subitem of item.menu\">\r\n          <button mat-button class=\"nav-item sub\" [class.highlight]=\"subitem.id === highlightedSubMenuItem\"\r\n            (click)=\"setActivePage(item.id, subitem.id, subitem.href)\">{{ subitem.name }}\r\n          </button>\r\n        </li>\r\n      </ul>\r\n    </li>\r\n  </ul>\r\n</nav>\r\n", styles: ["ul{list-style-type:none;margin:0;padding:0}.leftnav-main{box-shadow:2px 0 2px #0000003d;box-sizing:border-box;overflow:hidden;position:absolute;top:0;bottom:0;height:100%;z-index:2}.leftnav-sub{width:0;box-shadow:2px 0 2px #0000003d;position:absolute;top:0;bottom:0;left:60px;transition:width .3s;overflow-y:auto;overflow-x:hidden;z-index:2}.leftnav-sub.open{width:220px;border-left:1px solid #292b31;transition:width .7s}.nav-item{width:100%;position:relative;text-transform:none;line-height:50px;height:50px;color:#fff;text-align:left;font-size:13px;font-weight:400;letter-spacing:.1em;border-bottom:1px solid #292B31;border-radius:0}.nav-item.main{padding:0 54px 0 60px}.nav-item.sub{padding:0 10px;overflow:hidden;text-overflow:ellipsis}.nav-item.sub.highlight{box-shadow:none}.nav-item-icon{position:absolute;left:17px;line-height:50px;height:50px;font-size:18px}.nav-item-submenu-indicator{position:absolute;right:17px;line-height:50px;height:50px;font-size:18px}.subnav-header{color:#fff;height:70px;padding:25px 0 0 10px;overflow:hidden;white-space:nowrap;border-bottom:1px solid #292b31;box-sizing:border-box}.subnav-header h5{font-weight:300;font-size:13px;letter-spacing:.05em;margin:10px 0;text-transform:uppercase;text-overflow:ellipsis}.submenu{display:none}.submenu.active{display:block}\n"], dependencies: [{ kind: "directive", type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3$1.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "component", type: i6.MatButton, selector: "    button[mat-button], button[mat-raised-button], button[mat-flat-button],    button[mat-stroked-button]  ", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }], animations: [
        trigger('mainNavState', [
            state('collapsed', style({
                width: '60px'
            })),
            state('expanded', style({
                width: '280px'
            })),
            transition('collapsed <=> expanded', animate(200))
        ])
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiLeftnavComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mui-leftnav', exportAs: 'muiLeftnav', providers: [MuiLeftnavService], animations: [
                        trigger('mainNavState', [
                            state('collapsed', style({
                                width: '60px'
                            })),
                            state('expanded', style({
                                width: '280px'
                            })),
                            transition('collapsed <=> expanded', animate(200))
                        ])
                    ], template: "<nav class=\"leftnav-container\" (mouseleave)=\"onMouseLeaveNav()\">\r\n  <ul class=\"leftnav-main\" [@mainNavState]=\"mainNavState\">\r\n    <li>\r\n      <button mat-button class=\"nav-item main\" (click)=\"toggleState()\">\r\n        <mat-icon class=\"nav-item-icon\">menu</mat-icon>\r\n        &nbsp;\r\n      </button>\r\n    </li>\r\n    <!-- main menu --->\r\n    <li *ngFor=\"let item of navItems\" (mouseenter)=\"onEnterMainItem(item)\">\r\n      <button mat-button class=\"nav-item main\" [class.active]=\"item.id === activeMainItem\"\r\n        [class.highlight]=\"item.id === highlightedMainItem\"\r\n        (click)=\"setActivePage(item.id, undefined, item.href)\">\r\n        <mat-icon class=\"nav-item-icon\">{{ item.matIcon }}</mat-icon>\r\n        {{ item.name }}\r\n        <mat-icon class=\"nav-item-submenu-indicator\" *ngIf=\"item.menu\">chevron_right</mat-icon>\r\n      </button>\r\n    </li>\r\n  </ul>\r\n  <!-- 2nd level menu -->\r\n  <ul class=\"leftnav-sub\" [class.open]=\"subPanelOpen\">\r\n    <li *ngFor=\"let item of navItems\">\r\n      <ul *ngIf=\"item.menu\" class=\"submenu\" [class.active]=\"activeMainItem === item.id\">\r\n        <li class=\"subnav-header\"><h5>{{ item.name }}</h5></li>\r\n        <li *ngFor=\"let subitem of item.menu\">\r\n          <button mat-button class=\"nav-item sub\" [class.highlight]=\"subitem.id === highlightedSubMenuItem\"\r\n            (click)=\"setActivePage(item.id, subitem.id, subitem.href)\">{{ subitem.name }}\r\n          </button>\r\n        </li>\r\n      </ul>\r\n    </li>\r\n  </ul>\r\n</nav>\r\n", styles: ["ul{list-style-type:none;margin:0;padding:0}.leftnav-main{box-shadow:2px 0 2px #0000003d;box-sizing:border-box;overflow:hidden;position:absolute;top:0;bottom:0;height:100%;z-index:2}.leftnav-sub{width:0;box-shadow:2px 0 2px #0000003d;position:absolute;top:0;bottom:0;left:60px;transition:width .3s;overflow-y:auto;overflow-x:hidden;z-index:2}.leftnav-sub.open{width:220px;border-left:1px solid #292b31;transition:width .7s}.nav-item{width:100%;position:relative;text-transform:none;line-height:50px;height:50px;color:#fff;text-align:left;font-size:13px;font-weight:400;letter-spacing:.1em;border-bottom:1px solid #292B31;border-radius:0}.nav-item.main{padding:0 54px 0 60px}.nav-item.sub{padding:0 10px;overflow:hidden;text-overflow:ellipsis}.nav-item.sub.highlight{box-shadow:none}.nav-item-icon{position:absolute;left:17px;line-height:50px;height:50px;font-size:18px}.nav-item-submenu-indicator{position:absolute;right:17px;line-height:50px;height:50px;font-size:18px}.subnav-header{color:#fff;height:70px;padding:25px 0 0 10px;overflow:hidden;white-space:nowrap;border-bottom:1px solid #292b31;box-sizing:border-box}.subnav-header h5{font-weight:300;font-size:13px;letter-spacing:.05em;margin:10px 0;text-transform:uppercase;text-overflow:ellipsis}.submenu{display:none}.submenu.active{display:block}\n"] }]
        }], ctorParameters: function () { return [{ type: MuiLeftnavService }, { type: i2$1.Router, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { apiUrl: [{
                type: Input
            }], subNavSwitchDelay: [{
                type: Input
            }], navExpanded: [{
                type: Output
            }] } });

/**
 * Container component for holding left navigation and main app content
 * @deprecated
 */
class MuiLeftnavContainerComponent {
    constructor() {
        this.containerClass = 'mui-leftnav-container';
    }
    ngAfterContentInit() {
        this.leftnav.navExpanded.subscribe(expanded => {
            this.content.isContentPushed = expanded;
        });
    }
}
MuiLeftnavContainerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiLeftnavContainerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
MuiLeftnavContainerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: MuiLeftnavContainerComponent, selector: "mui-leftnav-container", host: { properties: { "class": "this.containerClass" } }, queries: [{ propertyName: "content", first: true, predicate: MuiLeftnavContentComponent, descendants: true }, { propertyName: "leftnav", first: true, predicate: MuiLeftnavComponent, descendants: true }], exportAs: ["muiLeftnavContainer"], ngImport: i0, template: "<ng-content select=\"mui-leftnav\"></ng-content>\r\n\r\n<ng-content select=\"mui-leftnav-content\"></ng-content>\r\n", styles: [".mui-leftnav-container{height:calc(100% - 54px);position:relative;box-sizing:border-box;overflow:hidden;z-index:1;display:block}.mui-leftnav-content{margin-left:60px;margin-right:0;display:block;position:relative;z-index:1;height:100%;transition:margin-left .2s;overflow:auto}.mui-leftnav-content.pushed{margin-left:280px}.nav-item.mat-mdc-button:hover .mat-button-focus-overlay{opacity:0}\n"], encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiLeftnavContainerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mui-leftnav-container', exportAs: 'muiLeftnavContainer', encapsulation: ViewEncapsulation.None, template: "<ng-content select=\"mui-leftnav\"></ng-content>\r\n\r\n<ng-content select=\"mui-leftnav-content\"></ng-content>\r\n", styles: [".mui-leftnav-container{height:calc(100% - 54px);position:relative;box-sizing:border-box;overflow:hidden;z-index:1;display:block}.mui-leftnav-content{margin-left:60px;margin-right:0;display:block;position:relative;z-index:1;height:100%;transition:margin-left .2s;overflow:auto}.mui-leftnav-content.pushed{margin-left:280px}.nav-item.mat-mdc-button:hover .mat-button-focus-overlay{opacity:0}\n"] }]
        }], propDecorators: { containerClass: [{
                type: HostBinding,
                args: ['class']
            }], content: [{
                type: ContentChild,
                args: [MuiLeftnavContentComponent]
            }], leftnav: [{
                type: ContentChild,
                args: [MuiLeftnavComponent]
            }] } });

class MuiNavigationModule {
}
MuiNavigationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiNavigationModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MuiNavigationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.10", ngImport: i0, type: MuiNavigationModule, declarations: [MuiLeftnavComponent, MuiLeftnavContainerComponent, MuiLeftnavContentComponent,
        MuiHeadernavComponent, HeadernavDialogComponent, SessionTimerComponent], imports: [CommonModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        MatInputModule,
        MatDialogModule,
        MatBadgeModule], exports: [MuiLeftnavComponent, MuiLeftnavContainerComponent, MuiLeftnavContentComponent, MuiHeadernavComponent] });
MuiNavigationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiNavigationModule, imports: [CommonModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        MatInputModule,
        MatDialogModule,
        MatBadgeModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiNavigationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        MatIconModule,
                        MatButtonModule,
                        MatMenuModule,
                        MatInputModule,
                        MatDialogModule,
                        MatBadgeModule
                    ],
                    exports: [MuiLeftnavComponent, MuiLeftnavContainerComponent, MuiLeftnavContentComponent, MuiHeadernavComponent],
                    declarations: [
                        MuiLeftnavComponent, MuiLeftnavContainerComponent, MuiLeftnavContentComponent,
                        MuiHeadernavComponent, HeadernavDialogComponent, SessionTimerComponent
                    ]
                }]
        }] });

class MuiStepComponent {
    constructor(cdr) {
        this.cdr = cdr;
        this._active = false;
        this._clickable = false;
        this._status = '';
        this.stepClasses = {};
        /**
         * Emits when internal state of step changes. Allows parent component to track and issue change detector refresh.
         */
        this.stateChanges = new EventEmitter();
    }
    get name() {
        return this._name;
    }
    /**
     * Main label to display for the step
     */
    set name(value) {
        this._name = value;
        this.onStateChanged();
    }
    get info() {
        return this._info;
    }
    /**
     * Additional Info to display below the main label
     */
    set info(value) {
        this._info = value;
        this.onStateChanged();
    }
    get active() {
        return this._active;
    }
    /**
     * Wether the step is currently active or not
     */
    set active(value) {
        this._active = value;
        this.onStateChanged();
    }
    get clickable() {
        return this._clickable;
    }
    /**
     * Control if the step should be clickable
     */
    set clickable(value) {
        this._clickable = value;
        this.onStateChanged();
    }
    get status() {
        return this._status;
    }
    set status(value) {
        this._status = value;
        this.onStateChanged();
    }
    ngOnDestroy() {
        this.stateChanges.complete();
    }
    onStateChanged() {
        this.setStepClasses();
        this.cdr.markForCheck();
        this.stateChanges.emit();
    }
    setStepClasses() {
        this.stepClasses = {
            'mui-state-active': this._active,
            'mui-clickable': this._clickable,
            'mui-state-error': this._status === 'error',
            'mui-state-edit': this._status === 'edit',
            'mui-state-done': this._status === 'done'
        };
    }
}
MuiStepComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiStepComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
MuiStepComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: MuiStepComponent, selector: "mui-step", inputs: { name: "name", info: "info", active: "active", clickable: "clickable", status: "status" }, outputs: { stateChanges: "stateChanges" }, exportAs: ["muiStep"], ngImport: i0, template: `
    <div *ngIf="active" class="mui-step-content">
      <ng-content></ng-content>
    </div>
  `, isInline: true, styles: [".mui-step-content{padding:24px 0;width:100%}\n"], dependencies: [{ kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiStepComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mui-step', exportAs: 'muiStep', template: `
    <div *ngIf="active" class="mui-step-content">
      <ng-content></ng-content>
    </div>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: [".mui-step-content{padding:24px 0;width:100%}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { stateChanges: [{
                type: Output
            }], name: [{
                type: Input
            }], info: [{
                type: Input
            }], active: [{
                type: Input
            }], clickable: [{
                type: Input
            }], status: [{
                type: Input
            }] } });

class MuiStepperComponent {
    constructor(cdr) {
        this.cdr = cdr;
        this.numberOfSteps = 0;
        this.activeStepIndex = 0;
        this.destroyed$ = new Subject();
    }
    get stepArray() {
        return this.steps.toArray();
    }
    ngAfterContentInit() {
        // track changes in the child steps
        const stepChangesArray = this.steps.map((step) => step.stateChanges);
        const stepChanges = merge(...stepChangesArray)
            .pipe(takeUntil(this.destroyed$));
        stepChanges.subscribe(() => {
            this.cdr.markForCheck();
        });
        // get active step
        const activeSteps = this.steps.filter((step) => step.active);
        // if there is no active step, make first step active
        if (activeSteps.length === 1) {
            this.selectStep(activeSteps[0]);
        }
        else {
            this.selectStep(this.steps.first);
        }
        // get number of steps
        this.numberOfSteps = this.steps.length;
        // set all steps to clickable if stepper is of type clickable
        if (this.isClickable) {
            this.steps.forEach(step => step.clickable = true);
        }
    }
    /**
     * Select the given step and make it active
     * @param step Step to make active
     */
    selectStep(step) {
        this.steps.forEach((s, i) => {
            if (s === step) {
                this.activeStepIndex = i;
            }
            s.active = false;
        });
        // activate the step the user has clicked
        step.active = true;
    }
    /**
     * Continue to next step
     */
    nextStep() {
        if (this.activeStepIndex < this.numberOfSteps - 1) {
            const steps = this.stepArray;
            steps[this.activeStepIndex].active = false;
            this.activeStepIndex++;
            steps[this.activeStepIndex].active = true;
        }
        this.cdr.markForCheck();
    }
    /**
     * Go back to previous step
     */
    previousStep() {
        if (this.activeStepIndex !== 0) {
            const steps = this.stepArray;
            steps[this.activeStepIndex].active = false;
            this.activeStepIndex--;
            steps[this.activeStepIndex].active = true;
        }
        this.cdr.markForCheck();
    }
    /**
     * Set status for a step
     * @param status new status for the step
     * @param stepIndex index of step of which status should be updated. Defaults to current active step
     */
    setStatus(status, stepIndex) {
        if (!stepIndex) {
            stepIndex = this.activeStepIndex;
        }
        const activeStep = this.stepArray[stepIndex];
        if (activeStep) {
            activeStep.status = status;
        }
    }
    /**
     * Control clickable state of a step
     * @param clickable wether to set a step to clickable or non-clickable
     * @param stepIndex Index of the step to change. Defaults to current active step
     */
    setClickable(clickable, stepIndex) {
        if (!stepIndex) {
            stepIndex = this.activeStepIndex;
        }
        if (stepIndex < this.stepArray.length) {
            this.stepArray[stepIndex].clickable = clickable;
        }
    }
    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
}
MuiStepperComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiStepperComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
MuiStepperComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: MuiStepperComponent, selector: "mui-stepper", inputs: { isClickable: "isClickable" }, queries: [{ propertyName: "steps", predicate: MuiStepComponent }], exportAs: ["muiStepper"], ngImport: i0, template: "<ul class=\"mui-stepper\">\r\n  <li *ngFor=\"let step of steps\" (click)=\"step.clickable && selectStep(step)\" [ngClass]=\"step.stepClasses\"\r\n    [ngStyle]=\"{'width': (100 / numberOfSteps) + '%'}\">\r\n    <div class=\"mui-step-name\">{{step.name}}</div>\r\n    <div class=\"mui-step-info\">{{step.info}}</div>\r\n  </li>\r\n</ul>\r\n<ng-content></ng-content>\r\n", styles: [".mui-stepper{counter-reset:step;margin:0;overflow:hidden;padding:0}.mui-stepper li{list-style-type:none;float:left;position:relative;text-align:center;padding:24px 0}.mui-stepper li.mui-clickable{cursor:pointer}.mui-stepper li:before{counter-increment:step;content:counter(step);font-size:12px;width:24px;height:24px;line-height:24px;display:block;text-align:center;margin:0 auto 10px;border-radius:50%}.mui-stepper li.mui-state-done,.mui-stepper li.mui-state-edit,.mui-stepper li.mui-state-error{font-feature-settings:\"liga\";-webkit-font-feature-settings:\"liga\"}.mui-stepper li.mui-state-done:before{content:\"check\";font-family:Material Icons}.mui-stepper li.mui-state-edit:before{content:\"edit\";font-family:Material Icons}.mui-stepper li.mui-state-error:before{background-color:transparent;content:\"warning\";font-family:Material Icons;font-size:24px;margin-top:1px}.mui-stepper li:after{content:\"\";position:absolute;left:calc(50% + 20px);height:1px;top:36px;width:calc(100% - 40px)}.mui-stepper li:last-child:after{content:none}.mui-stepper .mui-step-name,.mui-stepper .mui-step-info{padding:0 16px}.mui-stepper .mui-step-name{margin-top:13px}.mui-stepper li.mui-state-error .mui-step-name{margin-top:12px}\n"], dependencies: [{ kind: "directive", type: i4.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiStepperComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mui-stepper', exportAs: 'muiStepper', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ul class=\"mui-stepper\">\r\n  <li *ngFor=\"let step of steps\" (click)=\"step.clickable && selectStep(step)\" [ngClass]=\"step.stepClasses\"\r\n    [ngStyle]=\"{'width': (100 / numberOfSteps) + '%'}\">\r\n    <div class=\"mui-step-name\">{{step.name}}</div>\r\n    <div class=\"mui-step-info\">{{step.info}}</div>\r\n  </li>\r\n</ul>\r\n<ng-content></ng-content>\r\n", styles: [".mui-stepper{counter-reset:step;margin:0;overflow:hidden;padding:0}.mui-stepper li{list-style-type:none;float:left;position:relative;text-align:center;padding:24px 0}.mui-stepper li.mui-clickable{cursor:pointer}.mui-stepper li:before{counter-increment:step;content:counter(step);font-size:12px;width:24px;height:24px;line-height:24px;display:block;text-align:center;margin:0 auto 10px;border-radius:50%}.mui-stepper li.mui-state-done,.mui-stepper li.mui-state-edit,.mui-stepper li.mui-state-error{font-feature-settings:\"liga\";-webkit-font-feature-settings:\"liga\"}.mui-stepper li.mui-state-done:before{content:\"check\";font-family:Material Icons}.mui-stepper li.mui-state-edit:before{content:\"edit\";font-family:Material Icons}.mui-stepper li.mui-state-error:before{background-color:transparent;content:\"warning\";font-family:Material Icons;font-size:24px;margin-top:1px}.mui-stepper li:after{content:\"\";position:absolute;left:calc(50% + 20px);height:1px;top:36px;width:calc(100% - 40px)}.mui-stepper li:last-child:after{content:none}.mui-stepper .mui-step-name,.mui-stepper .mui-step-info{padding:0 16px}.mui-stepper .mui-step-name{margin-top:13px}.mui-stepper li.mui-state-error .mui-step-name{margin-top:12px}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { isClickable: [{
                type: Input
            }], steps: [{
                type: ContentChildren,
                args: [MuiStepComponent]
            }] } });

class MuiStepperModule {
}
MuiStepperModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiStepperModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MuiStepperModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.10", ngImport: i0, type: MuiStepperModule, declarations: [MuiStepperComponent, MuiStepComponent], imports: [CommonModule], exports: [MuiStepperComponent, MuiStepComponent] });
MuiStepperModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiStepperModule, imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiStepperModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [MuiStepperComponent, MuiStepComponent],
                    exports: [MuiStepperComponent, MuiStepComponent]
                }]
        }] });

/** @deprecated */
class MuiDrawerComponent {
    constructor(sidenav) {
        this.sidenav = sidenav;
    }
    closeSidenav() {
        if (this.sidenav) {
            this.sidenav.close();
        }
    }
}
MuiDrawerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiDrawerComponent, deps: [{ token: i1$2.MatSidenav, optional: true }], target: i0.ɵɵFactoryTarget.Component });
MuiDrawerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: MuiDrawerComponent, selector: "mui-drawer", exportAs: ["muiDrawer"], ngImport: i0, template: "<div class=\"mui-drawer\">\r\n  <div class=\"mui-drawer-header\">\r\n    <div class=\"mui-drawer-title\">\r\n      <ng-content select=\"[muiDrawerTitle]\"></ng-content>\r\n    </div>\r\n    <button mat-icon-button class=\"mui-drawer-close\" [disableRipple]=\"true\" (click)=\"closeSidenav()\" tabindex=\"-1\">\r\n      <mat-icon>close</mat-icon>\r\n    </button>\r\n  </div>\r\n  <div class=\"mui-drawer-add-ons\">\r\n    <ng-content select=\"[muiDrawerAddons]\"></ng-content>\r\n  </div>\r\n  <div class=\"mui-drawer-body\">\r\n    <div class=\"mui-drawer-details\">\r\n      <ng-content select=\"[muiDrawerContent]\"></ng-content>\r\n    </div>\r\n    <div class=\"mui-drawer-actions\">\r\n      <ng-content select=\"[muiDrawerControls]\"></ng-content>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [".mui-drawer{background-color:#f4f4f4;overflow-x:hidden;overflow-y:auto;padding:0;width:450px;height:100%}.mui-drawer-header{min-height:50px;padding:0 0 0 20px;background-color:#30333e;position:relative;display:flex;flex-direction:row;flex-wrap:nowrap}.mui-drawer-close{color:#fff;width:50px;height:50px}.mui-drawer-close:hover{color:#eee}.mui-drawer-title{color:#fff;line-height:50px;margin:0;overflow:hidden;text-overflow:ellipsis;text-transform:uppercase;font-family:Roboto,sans-serif;font-size:13px;width:380px}.mui-drawer-body{font-size:14px;height:calc(100% - 50px);overflow:hidden;display:flex;flex-direction:column}.mui-drawer-details{overflow-y:auto;overflow-x:hidden;padding:20px;margin:0;flex:1 1 auto}.mui-drawer-actions{text-align:right;flex:0 0 auto;padding:20px;border-top:1px solid #cccccc;background-color:#eee}.mui-drawer-add-ons{background-color:#404553;border-left:1px solid #292b31;color:#fff;float:right;height:calc(100% - 50px)}:host ::ng-deep [muiDrawerAddons]{width:50px}:host ::ng-deep .mui-drawer-add-ons button{background:transparent;border:none;color:#fff;border-radius:0;height:50px;width:50px;padding:0}:host ::ng-deep .mui-drawer-add-ons i{border-bottom:solid 1px #292b31;height:50px;width:50px;cursor:pointer;line-height:50px!important;text-align:center;vertical-align:middle;font-size:18px}:host ::ng-deep .mui-drawer-add-ons i:hover,:host ::ng-deep .mui-drawer-add-ons button:hover{background-color:#30333e}\n"], dependencies: [{ kind: "component", type: i6.MatIconButton, selector: "button[mat-icon-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "component", type: i3$1.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiDrawerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mui-drawer', exportAs: 'muiDrawer', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"mui-drawer\">\r\n  <div class=\"mui-drawer-header\">\r\n    <div class=\"mui-drawer-title\">\r\n      <ng-content select=\"[muiDrawerTitle]\"></ng-content>\r\n    </div>\r\n    <button mat-icon-button class=\"mui-drawer-close\" [disableRipple]=\"true\" (click)=\"closeSidenav()\" tabindex=\"-1\">\r\n      <mat-icon>close</mat-icon>\r\n    </button>\r\n  </div>\r\n  <div class=\"mui-drawer-add-ons\">\r\n    <ng-content select=\"[muiDrawerAddons]\"></ng-content>\r\n  </div>\r\n  <div class=\"mui-drawer-body\">\r\n    <div class=\"mui-drawer-details\">\r\n      <ng-content select=\"[muiDrawerContent]\"></ng-content>\r\n    </div>\r\n    <div class=\"mui-drawer-actions\">\r\n      <ng-content select=\"[muiDrawerControls]\"></ng-content>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [".mui-drawer{background-color:#f4f4f4;overflow-x:hidden;overflow-y:auto;padding:0;width:450px;height:100%}.mui-drawer-header{min-height:50px;padding:0 0 0 20px;background-color:#30333e;position:relative;display:flex;flex-direction:row;flex-wrap:nowrap}.mui-drawer-close{color:#fff;width:50px;height:50px}.mui-drawer-close:hover{color:#eee}.mui-drawer-title{color:#fff;line-height:50px;margin:0;overflow:hidden;text-overflow:ellipsis;text-transform:uppercase;font-family:Roboto,sans-serif;font-size:13px;width:380px}.mui-drawer-body{font-size:14px;height:calc(100% - 50px);overflow:hidden;display:flex;flex-direction:column}.mui-drawer-details{overflow-y:auto;overflow-x:hidden;padding:20px;margin:0;flex:1 1 auto}.mui-drawer-actions{text-align:right;flex:0 0 auto;padding:20px;border-top:1px solid #cccccc;background-color:#eee}.mui-drawer-add-ons{background-color:#404553;border-left:1px solid #292b31;color:#fff;float:right;height:calc(100% - 50px)}:host ::ng-deep [muiDrawerAddons]{width:50px}:host ::ng-deep .mui-drawer-add-ons button{background:transparent;border:none;color:#fff;border-radius:0;height:50px;width:50px;padding:0}:host ::ng-deep .mui-drawer-add-ons i{border-bottom:solid 1px #292b31;height:50px;width:50px;cursor:pointer;line-height:50px!important;text-align:center;vertical-align:middle;font-size:18px}:host ::ng-deep .mui-drawer-add-ons i:hover,:host ::ng-deep .mui-drawer-add-ons button:hover{background-color:#30333e}\n"] }]
        }], ctorParameters: function () { return [{ type: i1$2.MatSidenav, decorators: [{
                    type: Optional
                }] }]; } });
/**
 * Supporting directives for content projection
 */
class MuiDrawerTitleDirective {
}
MuiDrawerTitleDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiDrawerTitleDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MuiDrawerTitleDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.10", type: MuiDrawerTitleDirective, selector: "[muiDrawerTitle]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiDrawerTitleDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[muiDrawerTitle]'
                }]
        }] });
class MuiDrawerContentDirective {
}
MuiDrawerContentDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiDrawerContentDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MuiDrawerContentDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.10", type: MuiDrawerContentDirective, selector: "[muiDrawerContent]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiDrawerContentDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[muiDrawerContent]'
                }]
        }] });
class MuiDrawerAddonsDirective {
}
MuiDrawerAddonsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiDrawerAddonsDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MuiDrawerAddonsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.10", type: MuiDrawerAddonsDirective, selector: "[muiDrawerAddons]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiDrawerAddonsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[muiDrawerAddons]'
                }]
        }] });
class MuiDrawerControlsDirective {
}
MuiDrawerControlsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiDrawerControlsDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MuiDrawerControlsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.10", type: MuiDrawerControlsDirective, selector: "[muiDrawerControls]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiDrawerControlsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[muiDrawerControls]'
                }]
        }] });

class MuiDrawerModule {
}
MuiDrawerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiDrawerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MuiDrawerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.10", ngImport: i0, type: MuiDrawerModule, declarations: [MuiDrawerComponent, MuiDrawerTitleDirective, MuiDrawerContentDirective, MuiDrawerAddonsDirective,
        MuiDrawerControlsDirective], imports: [MatButtonModule, MatIconModule], exports: [MuiDrawerComponent, MuiDrawerTitleDirective, MuiDrawerContentDirective, MuiDrawerAddonsDirective, MuiDrawerControlsDirective] });
MuiDrawerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiDrawerModule, imports: [MatButtonModule, MatIconModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiDrawerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [MatButtonModule, MatIconModule],
                    exports: [MuiDrawerComponent, MuiDrawerTitleDirective, MuiDrawerContentDirective, MuiDrawerAddonsDirective, MuiDrawerControlsDirective],
                    declarations: [MuiDrawerComponent, MuiDrawerTitleDirective, MuiDrawerContentDirective, MuiDrawerAddonsDirective,
                        MuiDrawerControlsDirective]
                }]
        }] });

/**
 * Companion component for the engage icon-font, inspired by mat-icon.
 * Example: `<mui-icon>profile</mui-icon>`
 */
class MuiIconComponent {
    constructor() {
        this.role = 'img';
        this.isInline = false;
        this.defaultClassNames = ['mui-icon', 'mui-icons'];
        this.hostClassNames = [...this.defaultClassNames];
    }
    /**
     * Whether the icon should be inlined, automatically sizing the icon to match the font size of
     * the element the icon is contained in.
     */
    get inline() {
        return this.isInline;
    }
    set inline(inline) {
        this.isInline = coerceBooleanProperty(inline);
    }
    ngOnChanges(changes) {
        if (changes['color'] && this.color) {
            this.hostClassNames = [...this.defaultClassNames, 'mui-icon-' + this.color];
        }
    }
}
MuiIconComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiIconComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
MuiIconComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: MuiIconComponent, selector: "mui-icon", inputs: { color: "color", inline: "inline" }, host: { properties: { "attr.role": "this.role", "class": "this.hostClassNames", "class.mui-icon-inline": "this.inline" } }, exportAs: ["muiIcon"], usesOnChanges: true, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, styles: [".mui-icon{background-repeat:no-repeat;display:inline-block;fill:currentColor;height:24px;width:24px}.mui-icon.mui-icon-inline{font-size:inherit;height:inherit;line-height:inherit;width:inherit}.mat-mdc-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mui-icon,.mat-mdc-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mui-icon{display:block}.mat-mdc-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-mdc-icon-button .mui-icon,.mat-mdc-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-mdc-icon-button .mui-icon{margin:auto}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiIconComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mui-icon', exportAs: 'muiIcon', template: '<ng-content></ng-content>', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, styles: [".mui-icon{background-repeat:no-repeat;display:inline-block;fill:currentColor;height:24px;width:24px}.mui-icon.mui-icon-inline{font-size:inherit;height:inherit;line-height:inherit;width:inherit}.mat-mdc-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mui-icon,.mat-mdc-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mui-icon{display:block}.mat-mdc-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-mdc-icon-button .mui-icon,.mat-mdc-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-mdc-icon-button .mui-icon{margin:auto}\n"] }]
        }], ctorParameters: function () { return []; }, propDecorators: { role: [{
                type: HostBinding,
                args: ['attr.role']
            }], hostClassNames: [{
                type: HostBinding,
                args: ['class']
            }], color: [{
                type: Input
            }], inline: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['class.mui-icon-inline']
            }] } });

class MuiIconModule {
}
MuiIconModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiIconModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MuiIconModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.10", ngImport: i0, type: MuiIconModule, declarations: [MuiIconComponent], imports: [CommonModule], exports: [MuiIconComponent] });
MuiIconModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiIconModule, imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiIconModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [MuiIconComponent],
                    imports: [
                        CommonModule
                    ],
                    exports: [MuiIconComponent]
                }]
        }] });

class EditPasswordComponent {
    constructor(fb, http, nc, sanitizer, cd) {
        this.fb = fb;
        this.http = http;
        this.nc = nc;
        this.sanitizer = sanitizer;
        this.cd = cd;
        this.oldPasswordRequired = false;
    }
    get newPassword() {
        return this.form.get('new_psw');
    }
    get newPasswordConfirm() {
        return this.form.get('new_psw_confirm');
    }
    ngOnInit() {
        this.form = this.fb.group({
            new_psw: ['', Validators.required],
            new_psw_confirm: ['', Validators.required]
        }, {
            validators: control => {
                const psw = control.get('new_psw')?.value;
                const pswConfirm = control.get('new_psw_confirm');
                const pswConfirmVal = pswConfirm?.value;
                if (pswConfirmVal.length > 0 && pswConfirmVal !== psw) {
                    const passwordMatchError = { noPasswordMatch: true };
                    pswConfirm?.setErrors(passwordMatchError);
                    return passwordMatchError;
                }
                else {
                    return null;
                }
            }
        });
        if (this.oldPasswordRequired) {
            this.form.addControl('psw', this.fb.control('', Validators.required));
        }
    }
    updatePassword() {
        if (this.form.valid) {
            const data = this.form.value;
            data.suid = this.userId;
            data.action = 'changeSystemUserPassword';
            data.errorPage = '/inc/ecError.jsp';
            const body = new HttpParams({ fromObject: data });
            const responseHandler = (res) => {
                if (res.indexOf('ec-errors') > -1) {
                    this.errorMessage = this.sanitizer.bypassSecurityTrustHtml(res);
                }
                else {
                    this.nc.addNotification({
                        type: 'SUCCESS',
                        message: {
                            headline: 'Password updated successfully.'
                        }
                    });
                    this.errorMessage = null;
                }
                this.cd.markForCheck();
            };
            if (this.updatePasswordUrl) {
                this.http.post(this.updatePasswordUrl, body, { responseType: 'text' })
                    .subscribe({
                    next: responseHandler,
                    error: (err) => {
                        this.nc.addNotification({
                            type: 'ERROR',
                            message: {
                                headline: 'Password update failed.',
                                body: err.message
                            }
                        });
                    }
                });
            }
        }
    }
}
EditPasswordComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: EditPasswordComponent, deps: [{ token: i1$3.UntypedFormBuilder }, { token: i1.HttpClient }, { token: i3.NotificationService }, { token: i1$1.DomSanitizer }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
EditPasswordComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: EditPasswordComponent, selector: "mui-edit-password", inputs: { userId: "userId", updatePasswordUrl: "updatePasswordUrl", oldPasswordRequired: "oldPasswordRequired" }, ngImport: i0, template: "<section class=\"form-container\">\r\n  <h4 class=\"mat-h4\" i18n=\"@@topnav_setpasswd_title\">\r\n    Set a new password\r\n  </h4>\r\n\r\n  <form [formGroup]=\"form\">\r\n    <div class=\"two-col\">\r\n      <div class=\"col\">\r\n        <div *ngIf=\"oldPasswordRequired\">\r\n          <mat-form-field appearance=\"outline\">\r\n            <mat-label i18n=\"@@topnav_oldpasswd\">Old Password</mat-label>\r\n            <input formControlName=\"psw\"\r\n                matInput\r\n                required\r\n                type=\"password\">\r\n            <mat-error i18n=\"@@topnav_field_required\">This field is required</mat-error>\r\n          </mat-form-field>\r\n        </div>\r\n        <div>\r\n          <mat-form-field appearance=\"outline\">\r\n            <mat-label i18n=\"@@topnav_newpasswd\">New Password</mat-label>\r\n            <input formControlName=\"new_psw\"\r\n                matInput\r\n                required\r\n                type=\"password\">\r\n            <mat-error *ngIf=\"newPassword.hasError('required')\"\r\n                i18n=\"@@topnav_field_required\">This field is required</mat-error>\r\n          </mat-form-field>\r\n        </div>\r\n        <div>\r\n          <mat-form-field appearance=\"outline\">\r\n            <mat-label i18n=\"@@topnav_confirmpasswd\">Confirm Password</mat-label>\r\n            <input formControlName=\"new_psw_confirm\"\r\n                matInput\r\n                required\r\n                type=\"password\">\r\n            <mat-error *ngIf=\"newPasswordConfirm.hasError('noPasswordMatch')\"\r\n                i18n=\"@@topnav_passwordnomatch\">Passwords do not match\r\n            </mat-error>\r\n            <mat-error *ngIf=\"newPasswordConfirm.hasError('required')\"\r\n                i18n=\"@@topnav_field_required\">This field is required</mat-error>\r\n          </mat-form-field>\r\n        </div>\r\n      </div>\r\n      <div *ngIf=\"errorMessage\"\r\n          class=\"col error\">\r\n        <div [innerHTML]=\"errorMessage\"></div>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"actions\">\r\n      <button (click)=\"updatePassword()\"\r\n          color=\"primary\"\r\n          mat-flat-button\r\n          type=\"submit\"\r\n          [disabled]=\"form.invalid\"\r\n          i18n=\"@@topnav_savebtn\"\r\n      >Save\r\n      </button>\r\n    </div>\r\n  </form>\r\n</section>\r\n", styles: [".actions{margin-top:14px;text-align:right}.form-container{padding:14px 0;font-size:14px}.two-col{display:flex;flex-direction:row;flex-wrap:nowrap}.two-col .col{width:50%}.two-col .col .mat-mdc-form-field{width:95%}.two-col .error{color:#cb3d44}\n"], dependencies: [{ kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i6.MatButton, selector: "    button[mat-button], button[mat-raised-button], button[mat-flat-button],    button[mat-stroked-button]  ", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "directive", type: i8.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { kind: "component", type: i8$1.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i8$1.MatLabel, selector: "mat-label" }, { kind: "directive", type: i8$1.MatError, selector: "mat-error, [matError]", inputs: ["id"] }, { kind: "directive", type: i1$3.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1$3.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1$3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1$3.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1$3.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i1$3.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1$3.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: EditPasswordComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mui-edit-password', changeDetection: ChangeDetectionStrategy.OnPush, template: "<section class=\"form-container\">\r\n  <h4 class=\"mat-h4\" i18n=\"@@topnav_setpasswd_title\">\r\n    Set a new password\r\n  </h4>\r\n\r\n  <form [formGroup]=\"form\">\r\n    <div class=\"two-col\">\r\n      <div class=\"col\">\r\n        <div *ngIf=\"oldPasswordRequired\">\r\n          <mat-form-field appearance=\"outline\">\r\n            <mat-label i18n=\"@@topnav_oldpasswd\">Old Password</mat-label>\r\n            <input formControlName=\"psw\"\r\n                matInput\r\n                required\r\n                type=\"password\">\r\n            <mat-error i18n=\"@@topnav_field_required\">This field is required</mat-error>\r\n          </mat-form-field>\r\n        </div>\r\n        <div>\r\n          <mat-form-field appearance=\"outline\">\r\n            <mat-label i18n=\"@@topnav_newpasswd\">New Password</mat-label>\r\n            <input formControlName=\"new_psw\"\r\n                matInput\r\n                required\r\n                type=\"password\">\r\n            <mat-error *ngIf=\"newPassword.hasError('required')\"\r\n                i18n=\"@@topnav_field_required\">This field is required</mat-error>\r\n          </mat-form-field>\r\n        </div>\r\n        <div>\r\n          <mat-form-field appearance=\"outline\">\r\n            <mat-label i18n=\"@@topnav_confirmpasswd\">Confirm Password</mat-label>\r\n            <input formControlName=\"new_psw_confirm\"\r\n                matInput\r\n                required\r\n                type=\"password\">\r\n            <mat-error *ngIf=\"newPasswordConfirm.hasError('noPasswordMatch')\"\r\n                i18n=\"@@topnav_passwordnomatch\">Passwords do not match\r\n            </mat-error>\r\n            <mat-error *ngIf=\"newPasswordConfirm.hasError('required')\"\r\n                i18n=\"@@topnav_field_required\">This field is required</mat-error>\r\n          </mat-form-field>\r\n        </div>\r\n      </div>\r\n      <div *ngIf=\"errorMessage\"\r\n          class=\"col error\">\r\n        <div [innerHTML]=\"errorMessage\"></div>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"actions\">\r\n      <button (click)=\"updatePassword()\"\r\n          color=\"primary\"\r\n          mat-flat-button\r\n          type=\"submit\"\r\n          [disabled]=\"form.invalid\"\r\n          i18n=\"@@topnav_savebtn\"\r\n      >Save\r\n      </button>\r\n    </div>\r\n  </form>\r\n</section>\r\n", styles: [".actions{margin-top:14px;text-align:right}.form-container{padding:14px 0;font-size:14px}.two-col{display:flex;flex-direction:row;flex-wrap:nowrap}.two-col .col{width:50%}.two-col .col .mat-mdc-form-field{width:95%}.two-col .error{color:#cb3d44}\n"] }]
        }], ctorParameters: function () { return [{ type: i1$3.UntypedFormBuilder }, { type: i1.HttpClient }, { type: i3.NotificationService }, { type: i1$1.DomSanitizer }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { userId: [{
                type: Input
            }], updatePasswordUrl: [{
                type: Input
            }], oldPasswordRequired: [{
                type: Input
            }] } });

class EditProfileComponent {
    constructor(http, fb, cd, nc) {
        this.http = http;
        this.fb = fb;
        this.cd = cd;
        this.nc = nc;
        this.displayMfaSetting = false;
    }
    ngOnInit() {
        this.createForm();
        if (this.profileDataUrl) {
            this.http.get(this.profileDataUrl)
                .subscribe(res => {
                this.profileData = res;
                this.form.reset({
                    email: this.profileData['systemUser.Email'],
                    role: this.profileData['systemUser.CustomerRole'],
                    timeZone: this.profileData['systemUser.TimeZone'],
                    locale: this.profileData['systemUser.Locale'],
                    type: this.profileData['systemUser.Type'],
                    communication: this.profileData['systemUser.EmergencyCommunication'] === 'true',
                    firstName: this.profileData['systemUser.FirstName'],
                    lastName: this.profileData['systemUser.LastName'],
                    mfaEnabled: this.profileData['systemUser.MFA'] === 'true'
                });
                this.displayMfaSetting = this.profileData['systemUser.CanViewMFA'] === 'true';
                this.cd.markForCheck();
            });
        }
        if (this.languageDataUrl) {
            this.languages$ = this.http.get(this.languageDataUrl)
                .pipe(map(res => res.languagewithcountryseq));
        }
        if (this.timeZoneDataUrl) {
            this.timeZones$ = this.http.get(this.timeZoneDataUrl)
                .pipe(map(res => res.timezones));
        }
    }
    saveUserProfile() {
        if (this.form.invalid) {
            return;
        }
        const formData = this.form.value;
        const rawBody = {
            'systemUser.Email': this.profileData['systemUser.Email'],
            'systemUser.PK': this.profileData['systemUser.PK'],
            'systemUser.Type': this.profileData['systemUser.Type'],
            'systemUser.CustomerRole': this.profileData['systemUser.CustomerRole'],
            'systemUser.Locale': formData.locale,
            'systemUser.TimeZone': formData.timeZone,
            'systemUser.FirstName': formData.firstName,
            'systemUser.LastName': formData.lastName,
            'systemUser_emergencyCommunication': formData.communication ? 'on' : 'off',
            action: 'saveSystemUser',
            errorPage: '/inc/ecError.jsp'
        };
        if (this.displayMfaSetting) {
            rawBody['systemUser_mfaAdminRole'] = formData.mfaEnabled ? 'on' : 'off';
        }
        const body = new HttpParams({ fromObject: rawBody });
        const responseHandler = (res) => {
            if (res.indexOf('ec-errors') > -1) {
                this.nc.addNotification({
                    type: 'ERROR',
                    message: {
                        headline: 'Profile update failed.',
                        body: res,
                        htmlContent: true
                    }
                });
            }
            else {
                this.nc.addNotification({
                    type: 'SUCCESS',
                    message: {
                        headline: 'Profile updated.'
                    }
                });
            }
        };
        if (this.profileSaveUrl) {
            this.http.post(this.profileSaveUrl, body, { responseType: 'text' })
                .subscribe({
                next: responseHandler,
                error: (err) => {
                    console.error('Unexpected error saving user profile', err);
                }
            });
        }
    }
    createForm() {
        this.form = this.fb.group({
            email: [{ value: '', disabled: true }],
            role: [{ value: 'administrator', disabled: true }],
            timeZone: '',
            locale: '',
            type: [{ value: 'h', disabled: true }],
            communication: false,
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            mfaEnabled: false
        });
    }
}
EditProfileComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: EditProfileComponent, deps: [{ token: i1.HttpClient }, { token: i1$3.UntypedFormBuilder }, { token: i0.ChangeDetectorRef }, { token: i3.NotificationService }], target: i0.ɵɵFactoryTarget.Component });
EditProfileComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: EditProfileComponent, selector: "mui-edit-profile", inputs: { profileDataUrl: "profileDataUrl", languageDataUrl: "languageDataUrl", timeZoneDataUrl: "timeZoneDataUrl", profileSaveUrl: "profileSaveUrl" }, ngImport: i0, template: "<section *ngIf=\"profileData\"\r\n    class=\"form-container\">\r\n  <form [formGroup]=\"form\">\r\n    <div class=\"form-row\">\r\n      <mat-form-field appearance=\"outline\">\r\n        <mat-label i18n=\"@@topnav_editprofile_accounttype\">Type</mat-label>\r\n        <mat-select formControlName=\"type\">\r\n          <mat-option value=\"u\"\r\n              i18n=\"@@topnav_editprofile_uiuser\">\r\n            UI User\r\n          </mat-option>\r\n          <mat-option value=\"a\"\r\n              i18n=\"@@topnav_editprofile_apiuser\">\r\n            API User\r\n          </mat-option>\r\n          <mat-option value=\"h\"\r\n              i18n=\"@@topnav_editprofile_hybriduser\">\r\n            Hybrid User\r\n          </mat-option>\r\n        </mat-select>\r\n      </mat-form-field>\r\n      <mat-form-field appearance=\"outline\">\r\n        <mat-label i18n=\"@@topnav_editprofile_role\">Role</mat-label>\r\n        <mat-select formControlName=\"role\">\r\n          <mat-option value=\"administrator\"\r\n              i18n=\"@@topnav_editprofile_admin\">\r\n            Administrator\r\n          </mat-option>\r\n          <mat-option value=\"project_manager\"\r\n              i18n=\"@@topnav_editprofile_pm\">\r\n            Project Manager\r\n          </mat-option>\r\n          <mat-option value=\"client_admin\"\r\n              i18n=\"@@topnav_editprofile_clientadmin\">\r\n            Client Administrator\r\n          </mat-option>\r\n          <mat-option value=\"super_user\"\r\n              i18n=\"@@topnav_editprofile_superuser\">\r\n            Superuser\r\n          </mat-option>\r\n          <mat-option value=\"user\"\r\n              i18n=\"@@topnav_editprofile_normaluser\">\r\n            Normal User\r\n          </mat-option>\r\n          <mat-option value=\"cust_user1\">\r\n            <span i18n=\"@@topnav_editprofile_customuser\">Custom User</span> 1\r\n          </mat-option>\r\n          <mat-option value=\"cust_user2\">\r\n            <span i18n=\"@@topnav_editprofile_customuser\">Custom User</span> 2\r\n          </mat-option>\r\n          <mat-option value=\"cust_user3\">\r\n            <span i18n=\"@@topnav_editprofile_customuser\">Custom User</span> 3\r\n          </mat-option>\r\n          <mat-option value=\"cust_user4\">\r\n            <span i18n=\"@@topnav_editprofile_customuser\">Custom User</span> 4\r\n          </mat-option>\r\n          <mat-option value=\"cust_user5\">\r\n            <span i18n=\"@@topnav_editprofile_customuser\">Custom User</span> 5\r\n          </mat-option>\r\n          <mat-option value=\"cust_user6\">\r\n            <span i18n=\"@@topnav_editprofile_customuser\">Custom User</span> 6\r\n          </mat-option>\r\n          <mat-option value=\"cust_user7\">\r\n            <span i18n=\"@@topnav_editprofile_customuser\">Custom User</span> 7\r\n          </mat-option>\r\n          <mat-option value=\"cust_user8\">\r\n            <span i18n=\"@@topnav_editprofile_customuser\">Custom User</span> 8\r\n          </mat-option>\r\n          <mat-option value=\"none_role\"\r\n              i18n=\"@@topnav_editprofile_role_none\">\r\n            None\r\n          </mat-option>\r\n        </mat-select>\r\n      </mat-form-field>\r\n\r\n    </div>\r\n    <div class=\"form-row\">\r\n      <mat-form-field appearance=\"outline\"\r\n          class=\"email\">\r\n        <mat-label i18n=\"@@topnav_editprofile_email\">Email</mat-label>\r\n        <input formControlName=\"email\"\r\n            matInput\r\n            type=\"email\"\r\n        >\r\n      </mat-form-field>\r\n    </div>\r\n    <div class=\"form-row\">\r\n      <mat-form-field appearance=\"outline\">\r\n        <mat-label i18n=\"@@topnav_editprofile_firstname\">First Name</mat-label>\r\n        <input formControlName=\"firstName\"\r\n            matInput\r\n            required>\r\n        <mat-error i18n=\"@@topnav_field_required\">This field is required</mat-error>\r\n      </mat-form-field>\r\n\r\n      <mat-form-field appearance=\"outline\">\r\n        <mat-label i18n=\"@@topnav_editprofile_lastname\">Last Name</mat-label>\r\n        <input formControlName=\"lastName\"\r\n            matInput\r\n            required>\r\n        <mat-error i18n=\"@@topnav_field_required\">This field is required</mat-error>\r\n      </mat-form-field>\r\n    </div>\r\n    <div class=\"form-row\">\r\n      <mat-form-field appearance=\"outline\">\r\n        <mat-label i18n=\"@@topnav_editprofile_language\">Language</mat-label>\r\n        <mat-select formControlName=\"locale\">\r\n          <mat-option *ngFor=\"let lang of languages$ | async\"\r\n              [value]=\"lang.id\">{{ lang.name }}</mat-option>\r\n        </mat-select>\r\n      </mat-form-field>\r\n\r\n      <mat-form-field appearance=\"outline\">\r\n        <mat-label i18n=\"@@topnav_editprofile_timezone\">Time Zone</mat-label>\r\n        <mat-select formControlName=\"timeZone\">\r\n          <mat-option *ngFor=\"let zone of timeZones$ | async\"\r\n              [value]=\"zone.id\">{{ zone.name }}</mat-option>\r\n        </mat-select>\r\n      </mat-form-field>\r\n    </div>\r\n    <div class=\"form-row toggle\">\r\n      <mat-slide-toggle formControlName=\"communication\"\r\n          labelPosition=\"after\"\r\n          i18n=\"@@topnav_editprofile_receive_emergency\">Receive emergency\r\n        communication\r\n      </mat-slide-toggle>\r\n    </div>\r\n    <div class=\"form-row toggle\"\r\n        *ngIf=\"displayMfaSetting\">\r\n      <mat-slide-toggle formControlName=\"mfaEnabled\"\r\n          labelPosition=\"after\"\r\n          i18n=\"@@topnav_editprofile_mfa\">Enable MFA for admin role\r\n      </mat-slide-toggle>\r\n    </div>\r\n    <div class=\"actions\">\r\n      <button (click)=\"saveUserProfile()\"\r\n          color=\"primary\"\r\n          mat-flat-button\r\n          type=\"button\"\r\n          i18n=\"@@topnav_savebtn\"\r\n      >Save\r\n      </button>\r\n    </div>\r\n  </form>\r\n</section>\r\n", styles: [".actions{margin-top:14px;text-align:right}.form-container{padding:14px 0;font-size:14px}.form-row{display:flex;flex-direction:row;justify-content:space-between;margin-bottom:5px}.form-row>.mat-mdc-form-field{width:47%}.form-row>.mat-mdc-form-field.email{width:100%}.toggle{margin-bottom:24px;padding-left:14px}\n"], dependencies: [{ kind: "directive", type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i6.MatButton, selector: "    button[mat-button], button[mat-raised-button], button[mat-flat-button],    button[mat-stroked-button]  ", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "directive", type: i8.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { kind: "component", type: i8$1.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i8$1.MatLabel, selector: "mat-label" }, { kind: "directive", type: i8$1.MatError, selector: "mat-error, [matError]", inputs: ["id"] }, { kind: "component", type: i8$2.MatSlideToggle, selector: "mat-slide-toggle", inputs: ["disabled", "disableRipple", "color", "tabIndex"], exportAs: ["matSlideToggle"] }, { kind: "component", type: i9.MatSelect, selector: "mat-select", inputs: ["disabled", "disableRipple", "tabIndex", "hideSingleSelectionIndicator"], exportAs: ["matSelect"] }, { kind: "component", type: i10$1.MatOption, selector: "mat-option", exportAs: ["matOption"] }, { kind: "directive", type: i1$3.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1$3.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1$3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1$3.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1$3.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i1$3.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1$3.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "pipe", type: i4.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: EditProfileComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mui-edit-profile', changeDetection: ChangeDetectionStrategy.OnPush, template: "<section *ngIf=\"profileData\"\r\n    class=\"form-container\">\r\n  <form [formGroup]=\"form\">\r\n    <div class=\"form-row\">\r\n      <mat-form-field appearance=\"outline\">\r\n        <mat-label i18n=\"@@topnav_editprofile_accounttype\">Type</mat-label>\r\n        <mat-select formControlName=\"type\">\r\n          <mat-option value=\"u\"\r\n              i18n=\"@@topnav_editprofile_uiuser\">\r\n            UI User\r\n          </mat-option>\r\n          <mat-option value=\"a\"\r\n              i18n=\"@@topnav_editprofile_apiuser\">\r\n            API User\r\n          </mat-option>\r\n          <mat-option value=\"h\"\r\n              i18n=\"@@topnav_editprofile_hybriduser\">\r\n            Hybrid User\r\n          </mat-option>\r\n        </mat-select>\r\n      </mat-form-field>\r\n      <mat-form-field appearance=\"outline\">\r\n        <mat-label i18n=\"@@topnav_editprofile_role\">Role</mat-label>\r\n        <mat-select formControlName=\"role\">\r\n          <mat-option value=\"administrator\"\r\n              i18n=\"@@topnav_editprofile_admin\">\r\n            Administrator\r\n          </mat-option>\r\n          <mat-option value=\"project_manager\"\r\n              i18n=\"@@topnav_editprofile_pm\">\r\n            Project Manager\r\n          </mat-option>\r\n          <mat-option value=\"client_admin\"\r\n              i18n=\"@@topnav_editprofile_clientadmin\">\r\n            Client Administrator\r\n          </mat-option>\r\n          <mat-option value=\"super_user\"\r\n              i18n=\"@@topnav_editprofile_superuser\">\r\n            Superuser\r\n          </mat-option>\r\n          <mat-option value=\"user\"\r\n              i18n=\"@@topnav_editprofile_normaluser\">\r\n            Normal User\r\n          </mat-option>\r\n          <mat-option value=\"cust_user1\">\r\n            <span i18n=\"@@topnav_editprofile_customuser\">Custom User</span> 1\r\n          </mat-option>\r\n          <mat-option value=\"cust_user2\">\r\n            <span i18n=\"@@topnav_editprofile_customuser\">Custom User</span> 2\r\n          </mat-option>\r\n          <mat-option value=\"cust_user3\">\r\n            <span i18n=\"@@topnav_editprofile_customuser\">Custom User</span> 3\r\n          </mat-option>\r\n          <mat-option value=\"cust_user4\">\r\n            <span i18n=\"@@topnav_editprofile_customuser\">Custom User</span> 4\r\n          </mat-option>\r\n          <mat-option value=\"cust_user5\">\r\n            <span i18n=\"@@topnav_editprofile_customuser\">Custom User</span> 5\r\n          </mat-option>\r\n          <mat-option value=\"cust_user6\">\r\n            <span i18n=\"@@topnav_editprofile_customuser\">Custom User</span> 6\r\n          </mat-option>\r\n          <mat-option value=\"cust_user7\">\r\n            <span i18n=\"@@topnav_editprofile_customuser\">Custom User</span> 7\r\n          </mat-option>\r\n          <mat-option value=\"cust_user8\">\r\n            <span i18n=\"@@topnav_editprofile_customuser\">Custom User</span> 8\r\n          </mat-option>\r\n          <mat-option value=\"none_role\"\r\n              i18n=\"@@topnav_editprofile_role_none\">\r\n            None\r\n          </mat-option>\r\n        </mat-select>\r\n      </mat-form-field>\r\n\r\n    </div>\r\n    <div class=\"form-row\">\r\n      <mat-form-field appearance=\"outline\"\r\n          class=\"email\">\r\n        <mat-label i18n=\"@@topnav_editprofile_email\">Email</mat-label>\r\n        <input formControlName=\"email\"\r\n            matInput\r\n            type=\"email\"\r\n        >\r\n      </mat-form-field>\r\n    </div>\r\n    <div class=\"form-row\">\r\n      <mat-form-field appearance=\"outline\">\r\n        <mat-label i18n=\"@@topnav_editprofile_firstname\">First Name</mat-label>\r\n        <input formControlName=\"firstName\"\r\n            matInput\r\n            required>\r\n        <mat-error i18n=\"@@topnav_field_required\">This field is required</mat-error>\r\n      </mat-form-field>\r\n\r\n      <mat-form-field appearance=\"outline\">\r\n        <mat-label i18n=\"@@topnav_editprofile_lastname\">Last Name</mat-label>\r\n        <input formControlName=\"lastName\"\r\n            matInput\r\n            required>\r\n        <mat-error i18n=\"@@topnav_field_required\">This field is required</mat-error>\r\n      </mat-form-field>\r\n    </div>\r\n    <div class=\"form-row\">\r\n      <mat-form-field appearance=\"outline\">\r\n        <mat-label i18n=\"@@topnav_editprofile_language\">Language</mat-label>\r\n        <mat-select formControlName=\"locale\">\r\n          <mat-option *ngFor=\"let lang of languages$ | async\"\r\n              [value]=\"lang.id\">{{ lang.name }}</mat-option>\r\n        </mat-select>\r\n      </mat-form-field>\r\n\r\n      <mat-form-field appearance=\"outline\">\r\n        <mat-label i18n=\"@@topnav_editprofile_timezone\">Time Zone</mat-label>\r\n        <mat-select formControlName=\"timeZone\">\r\n          <mat-option *ngFor=\"let zone of timeZones$ | async\"\r\n              [value]=\"zone.id\">{{ zone.name }}</mat-option>\r\n        </mat-select>\r\n      </mat-form-field>\r\n    </div>\r\n    <div class=\"form-row toggle\">\r\n      <mat-slide-toggle formControlName=\"communication\"\r\n          labelPosition=\"after\"\r\n          i18n=\"@@topnav_editprofile_receive_emergency\">Receive emergency\r\n        communication\r\n      </mat-slide-toggle>\r\n    </div>\r\n    <div class=\"form-row toggle\"\r\n        *ngIf=\"displayMfaSetting\">\r\n      <mat-slide-toggle formControlName=\"mfaEnabled\"\r\n          labelPosition=\"after\"\r\n          i18n=\"@@topnav_editprofile_mfa\">Enable MFA for admin role\r\n      </mat-slide-toggle>\r\n    </div>\r\n    <div class=\"actions\">\r\n      <button (click)=\"saveUserProfile()\"\r\n          color=\"primary\"\r\n          mat-flat-button\r\n          type=\"button\"\r\n          i18n=\"@@topnav_savebtn\"\r\n      >Save\r\n      </button>\r\n    </div>\r\n  </form>\r\n</section>\r\n", styles: [".actions{margin-top:14px;text-align:right}.form-container{padding:14px 0;font-size:14px}.form-row{display:flex;flex-direction:row;justify-content:space-between;margin-bottom:5px}.form-row>.mat-mdc-form-field{width:47%}.form-row>.mat-mdc-form-field.email{width:100%}.toggle{margin-bottom:24px;padding-left:14px}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i1$3.UntypedFormBuilder }, { type: i0.ChangeDetectorRef }, { type: i3.NotificationService }]; }, propDecorators: { profileDataUrl: [{
                type: Input
            }], languageDataUrl: [{
                type: Input
            }], timeZoneDataUrl: [{
                type: Input
            }], profileSaveUrl: [{
                type: Input
            }] } });

class NotificationBellComponent {
    constructor(notificationService) {
        this.notificationService = notificationService;
        this.notificationCenterEnabled = false;
    }
    ngOnInit() {
        if (this.notificationService && this.notificationCenter) {
            this.notificationCount = this.notificationService.unseenCounter;
            this.notificationBadgeHidden = this.notificationCount.pipe(map(x => x === 0));
            this.notificationCenterEnabled = true;
        }
        else {
            this.notificationCount = EMPTY;
        }
    }
    toggleNotificationPanel() {
        if (this.notificationCenterEnabled) {
            this.notificationCenter.toggleState();
        }
    }
}
NotificationBellComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NotificationBellComponent, deps: [{ token: i3.NotificationService, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NotificationBellComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: NotificationBellComponent, selector: "mui-notification-bell", inputs: { navItem: "navItem", notificationCenter: "notificationCenter" }, ngImport: i0, template: "<button (click)=\"toggleNotificationPanel()\"\r\n    class=\"mui-auxnav-button\"\r\n    mat-icon-button\r\n    [id]=\"navItem.id\"\r\n>\r\n  <span [matBadgeHidden]=\"notificationBadgeHidden | async\"\r\n      [matBadge]=\"notificationCount | async\"\r\n      class=\"mui-icons\"\r\n      matBadgeColor=\"warn\">{{ navItem.icon }}</span>\r\n</button>\r\n\r\n", styles: [":host{display:block;width:48px;height:100%}.mui-auxnav-button{width:100%;height:100%;border-radius:0}\n"], dependencies: [{ kind: "component", type: i6.MatIconButton, selector: "button[mat-icon-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "directive", type: i10.MatBadge, selector: "[matBadge]", inputs: ["matBadgeDisabled", "matBadgeColor", "matBadgeOverlap", "matBadgePosition", "matBadge", "matBadgeDescription", "matBadgeSize", "matBadgeHidden"] }, { kind: "pipe", type: i4.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: NotificationBellComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mui-notification-bell', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button (click)=\"toggleNotificationPanel()\"\r\n    class=\"mui-auxnav-button\"\r\n    mat-icon-button\r\n    [id]=\"navItem.id\"\r\n>\r\n  <span [matBadgeHidden]=\"notificationBadgeHidden | async\"\r\n      [matBadge]=\"notificationCount | async\"\r\n      class=\"mui-icons\"\r\n      matBadgeColor=\"warn\">{{ navItem.icon }}</span>\r\n</button>\r\n\r\n", styles: [":host{display:block;width:48px;height:100%}.mui-auxnav-button{width:100%;height:100%;border-radius:0}\n"] }]
        }], ctorParameters: function () { return [{ type: i3.NotificationService, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { navItem: [{
                type: Input
            }], notificationCenter: [{
                type: Input
            }] } });

class LangChangeDialogComponent {
    constructor() {
        this.hostClass = 'mui-dialog';
    }
}
LangChangeDialogComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: LangChangeDialogComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
LangChangeDialogComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: LangChangeDialogComponent, selector: "mui-lang-change-dialog", host: { properties: { "class": "this.hostClass" } }, ngImport: i0, template: "<button mat-icon-button\r\n    mat-dialog-close=\"cancel\"\r\n    class=\"mui-dialog-close\">\r\n  <mui-icon>close</mui-icon>\r\n</button>\r\n\r\n<h2 class=\"dialog-title-icon-centered\"\r\n    mat-dialog-title>\r\n  <mui-icon color=\"info\">info</mui-icon>\r\n  <span i18n=\"@@topnav_langchange_title\">The language will be changed</span>\r\n</h2>\r\n<mat-dialog-content class=\"mat-typography dialog-content-centered\">\r\n  <p i18n=\"@@topnav_langchange_text1\">Engage needs to be reloaded to apply the language change. You will be redirected\r\n    to the start page.</p>\r\n  <p i18n=\"@@topnav_langchange_text2\">Any unsaved work will be lost.</p>\r\n</mat-dialog-content>\r\n<mat-dialog-actions align=\"center\">\r\n  <button color=\"primary\"\r\n      mat-dialog-close=\"cancel\"\r\n      mat-stroked-button\r\n      i18n=\"@@topnav_cancelbtn\"\r\n  >Cancel\r\n  </button>\r\n  <button color=\"primary\"\r\n      mat-dialog-close=\"change\"\r\n      mat-flat-button\r\n      i18n=\"@@topnav_langchange_changebtn\"\r\n  >Change\r\n  </button>\r\n</mat-dialog-actions>\r\n", styles: [".info-icon{color:#65569a}\n"], dependencies: [{ kind: "component", type: i6.MatButton, selector: "    button[mat-button], button[mat-raised-button], button[mat-flat-button],    button[mat-stroked-button]  ", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "component", type: i6.MatIconButton, selector: "button[mat-icon-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "directive", type: i2.MatDialogClose, selector: "[mat-dialog-close], [matDialogClose]", inputs: ["aria-label", "type", "mat-dialog-close", "matDialogClose"], exportAs: ["matDialogClose"] }, { kind: "directive", type: i2.MatDialogTitle, selector: "[mat-dialog-title], [matDialogTitle]", inputs: ["id"], exportAs: ["matDialogTitle"] }, { kind: "directive", type: i2.MatDialogContent, selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]" }, { kind: "directive", type: i2.MatDialogActions, selector: "[mat-dialog-actions], mat-dialog-actions, [matDialogActions]", inputs: ["align"] }, { kind: "component", type: MuiIconComponent, selector: "mui-icon", inputs: ["color", "inline"], exportAs: ["muiIcon"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: LangChangeDialogComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mui-lang-change-dialog', template: "<button mat-icon-button\r\n    mat-dialog-close=\"cancel\"\r\n    class=\"mui-dialog-close\">\r\n  <mui-icon>close</mui-icon>\r\n</button>\r\n\r\n<h2 class=\"dialog-title-icon-centered\"\r\n    mat-dialog-title>\r\n  <mui-icon color=\"info\">info</mui-icon>\r\n  <span i18n=\"@@topnav_langchange_title\">The language will be changed</span>\r\n</h2>\r\n<mat-dialog-content class=\"mat-typography dialog-content-centered\">\r\n  <p i18n=\"@@topnav_langchange_text1\">Engage needs to be reloaded to apply the language change. You will be redirected\r\n    to the start page.</p>\r\n  <p i18n=\"@@topnav_langchange_text2\">Any unsaved work will be lost.</p>\r\n</mat-dialog-content>\r\n<mat-dialog-actions align=\"center\">\r\n  <button color=\"primary\"\r\n      mat-dialog-close=\"cancel\"\r\n      mat-stroked-button\r\n      i18n=\"@@topnav_cancelbtn\"\r\n  >Cancel\r\n  </button>\r\n  <button color=\"primary\"\r\n      mat-dialog-close=\"change\"\r\n      mat-flat-button\r\n      i18n=\"@@topnav_langchange_changebtn\"\r\n  >Change\r\n  </button>\r\n</mat-dialog-actions>\r\n", styles: [".info-icon{color:#65569a}\n"] }]
        }], propDecorators: { hostClass: [{
                type: HostBinding,
                args: ['class']
            }] } });

/**
 * Dialog component which handles the "About" dialog as well as the "Account Settings"
 */
class TopNavDialogComponent {
    constructor(data, sanitizer, http, cd) {
        this.data = data;
        this.sanitizer = sanitizer;
        this.http = http;
        this.cd = cd;
        this.hostClass = 'mui-dialog';
    }
    ngOnInit() {
        if (this.data.srcUrl) {
            this.http.get(this.data.srcUrl, { responseType: 'text' })
                .subscribe(content => {
                this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(content);
                this.cd.detectChanges();
            });
        }
    }
}
TopNavDialogComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: TopNavDialogComponent, deps: [{ token: MAT_DIALOG_DATA }, { token: i1$1.DomSanitizer }, { token: i1.HttpClient }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
TopNavDialogComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: TopNavDialogComponent, selector: "ng-component", host: { properties: { "class": "this.hostClass" } }, ngImport: i0, template: "<h2 mat-dialog-title>\r\n  <span *ngIf=\"data.title\">{{ data.title }}</span>\r\n  <span *ngIf=\"data.accountSettings\" i18n=\"@@topnav_account_tab\">Account Settings</span>\r\n</h2>\r\n<button class=\"mui-dialog-close\"\r\n    mat-dialog-close=\"close\"\r\n    tabindex=\"-1\"\r\n    mat-icon-button>\r\n  <span class=\"mui-icons account-dialog-close\">close</span>\r\n</button>\r\n\r\n<div class=\"mui-nav-dialog-content\">\r\n  <mat-tab-group *ngIf=\"data.accountSettings\"\r\n      mat-stretch-tabs=\"false\">\r\n    <mat-tab label=\"Edit Profile\"\r\n        i18n-label=\"@@topnav_editprofile_tab\">\r\n      <ng-template matTabContent>\r\n        <mui-edit-profile\r\n            [languageDataUrl]=\"data.languageDataUrl\"\r\n            [profileDataUrl]=\"data.profileDataUrl\"\r\n            [profileSaveUrl]=\"data.profileSaveUrl\"\r\n            [timeZoneDataUrl]=\"data.timeZoneDataUrl\"></mui-edit-profile>\r\n      </ng-template>\r\n    </mat-tab>\r\n    <mat-tab label=\"New Password\"\r\n        i18n-label=\"@@topnav_newpasswd_tab\">\r\n      <ng-template matTabContent>\r\n        <mui-edit-password [updatePasswordUrl]=\"data.updatePasswordUrl\"\r\n            [userId]=\"data.userId\"\r\n            [oldPasswordRequired]=\"data.oldPasswordRequired\"\r\n        ></mui-edit-password>\r\n      </ng-template>\r\n    </mat-tab>\r\n  </mat-tab-group>\r\n\r\n  <div *ngIf=\"htmlContent\"\r\n      [innerHTML]=\"htmlContent\"></div>\r\n\r\n  <div *ngFor=\"let item of data.additionalContent\">\r\n    {{ item }}\r\n  </div>\r\n\r\n</div>\r\n", styles: [".profile-iframe{border:none;width:100%;height:400px;margin:0;padding:0}.mui-nav-dialog-content{padding:20px 24px;box-sizing:border-box;margin:0;overflow:auto}\n"], dependencies: [{ kind: "directive", type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i6.MatIconButton, selector: "button[mat-icon-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "directive", type: i5$1.MatTabContent, selector: "[matTabContent]" }, { kind: "component", type: i5$1.MatTab, selector: "mat-tab", inputs: ["disabled"], exportAs: ["matTab"] }, { kind: "component", type: i5$1.MatTabGroup, selector: "mat-tab-group", inputs: ["color", "disableRipple", "fitInkBarToContent", "mat-stretch-tabs"], exportAs: ["matTabGroup"] }, { kind: "directive", type: i2.MatDialogClose, selector: "[mat-dialog-close], [matDialogClose]", inputs: ["aria-label", "type", "mat-dialog-close", "matDialogClose"], exportAs: ["matDialogClose"] }, { kind: "directive", type: i2.MatDialogTitle, selector: "[mat-dialog-title], [matDialogTitle]", inputs: ["id"], exportAs: ["matDialogTitle"] }, { kind: "component", type: EditProfileComponent, selector: "mui-edit-profile", inputs: ["profileDataUrl", "languageDataUrl", "timeZoneDataUrl", "profileSaveUrl"] }, { kind: "component", type: EditPasswordComponent, selector: "mui-edit-password", inputs: ["userId", "updatePasswordUrl", "oldPasswordRequired"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: TopNavDialogComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, template: "<h2 mat-dialog-title>\r\n  <span *ngIf=\"data.title\">{{ data.title }}</span>\r\n  <span *ngIf=\"data.accountSettings\" i18n=\"@@topnav_account_tab\">Account Settings</span>\r\n</h2>\r\n<button class=\"mui-dialog-close\"\r\n    mat-dialog-close=\"close\"\r\n    tabindex=\"-1\"\r\n    mat-icon-button>\r\n  <span class=\"mui-icons account-dialog-close\">close</span>\r\n</button>\r\n\r\n<div class=\"mui-nav-dialog-content\">\r\n  <mat-tab-group *ngIf=\"data.accountSettings\"\r\n      mat-stretch-tabs=\"false\">\r\n    <mat-tab label=\"Edit Profile\"\r\n        i18n-label=\"@@topnav_editprofile_tab\">\r\n      <ng-template matTabContent>\r\n        <mui-edit-profile\r\n            [languageDataUrl]=\"data.languageDataUrl\"\r\n            [profileDataUrl]=\"data.profileDataUrl\"\r\n            [profileSaveUrl]=\"data.profileSaveUrl\"\r\n            [timeZoneDataUrl]=\"data.timeZoneDataUrl\"></mui-edit-profile>\r\n      </ng-template>\r\n    </mat-tab>\r\n    <mat-tab label=\"New Password\"\r\n        i18n-label=\"@@topnav_newpasswd_tab\">\r\n      <ng-template matTabContent>\r\n        <mui-edit-password [updatePasswordUrl]=\"data.updatePasswordUrl\"\r\n            [userId]=\"data.userId\"\r\n            [oldPasswordRequired]=\"data.oldPasswordRequired\"\r\n        ></mui-edit-password>\r\n      </ng-template>\r\n    </mat-tab>\r\n  </mat-tab-group>\r\n\r\n  <div *ngIf=\"htmlContent\"\r\n      [innerHTML]=\"htmlContent\"></div>\r\n\r\n  <div *ngFor=\"let item of data.additionalContent\">\r\n    {{ item }}\r\n  </div>\r\n\r\n</div>\r\n", styles: [".profile-iframe{border:none;width:100%;height:400px;margin:0;padding:0}.mui-nav-dialog-content{padding:20px 24px;box-sizing:border-box;margin:0;overflow:auto}\n"] }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_DIALOG_DATA]
                }] }, { type: i1$1.DomSanitizer }, { type: i1.HttpClient }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { hostClass: [{
                type: HostBinding,
                args: ['class']
            }] } });

class TimeoutDialogComponent {
    constructor() {
        this.hostClass = 'mui-dialog';
    }
}
TimeoutDialogComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: TimeoutDialogComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
TimeoutDialogComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: TimeoutDialogComponent, selector: "ng-component", host: { properties: { "class": "this.hostClass" } }, ngImport: i0, template: "<h2 class=\"dialog-title-icon-centered\"\r\n    mat-dialog-title>\r\n  <mui-icon color=\"warning\">warning</mui-icon>\r\n  <span i18n=\"@@topnav_sessiontimeout_title\">Session Timeout Alert</span>\r\n</h2>\r\n<mat-dialog-content class=\"mat-typography dialog-content-centered\">\r\n  <p class=\"timeout-minutes\"\r\n      i18n=\"@@topnav_sessiontimeout_text1\">Your session will end in 5 minutes.</p>\r\n  <p i18n=\"@@topnav_sessiontimeout_text2\">You've been timed out due to inactivity. You may <span\r\n      class=\"bold\">stop the timer</span> or\r\n    <span class=\"bold\">resume working normally.</span></p>\r\n  <p i18n=\"@@topnav_sessiontimeout_text3\">You will be logged out automatically when the session expires.</p>\r\n  <p class=\"timer-menu-hint\"\r\n      i18n=\"@@topnav_sessiontimeout_text4\">You can restart the timer from the User Menu.</p>\r\n</mat-dialog-content>\r\n<mat-dialog-actions align=\"center\">\r\n  <button color=\"primary\"\r\n      mat-dialog-close=\"Resume\"\r\n      mat-flat-button\r\n      i18n=\"@@topnav_sessiontimeout_resume\"\r\n  >Resume\r\n  </button>\r\n  <button color=\"primary\"\r\n      mat-dialog-close=\"Stop\"\r\n      mat-flat-button\r\n      i18n=\"@@topnav_sessiontimeout_stop\"\r\n  >Stop Timeout\r\n  </button>\r\n</mat-dialog-actions>\r\n", dependencies: [{ kind: "component", type: i6.MatButton, selector: "    button[mat-button], button[mat-raised-button], button[mat-flat-button],    button[mat-stroked-button]  ", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "directive", type: i2.MatDialogClose, selector: "[mat-dialog-close], [matDialogClose]", inputs: ["aria-label", "type", "mat-dialog-close", "matDialogClose"], exportAs: ["matDialogClose"] }, { kind: "directive", type: i2.MatDialogTitle, selector: "[mat-dialog-title], [matDialogTitle]", inputs: ["id"], exportAs: ["matDialogTitle"] }, { kind: "directive", type: i2.MatDialogContent, selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]" }, { kind: "directive", type: i2.MatDialogActions, selector: "[mat-dialog-actions], mat-dialog-actions, [matDialogActions]", inputs: ["align"] }, { kind: "component", type: MuiIconComponent, selector: "mui-icon", inputs: ["color", "inline"], exportAs: ["muiIcon"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: TimeoutDialogComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, template: "<h2 class=\"dialog-title-icon-centered\"\r\n    mat-dialog-title>\r\n  <mui-icon color=\"warning\">warning</mui-icon>\r\n  <span i18n=\"@@topnav_sessiontimeout_title\">Session Timeout Alert</span>\r\n</h2>\r\n<mat-dialog-content class=\"mat-typography dialog-content-centered\">\r\n  <p class=\"timeout-minutes\"\r\n      i18n=\"@@topnav_sessiontimeout_text1\">Your session will end in 5 minutes.</p>\r\n  <p i18n=\"@@topnav_sessiontimeout_text2\">You've been timed out due to inactivity. You may <span\r\n      class=\"bold\">stop the timer</span> or\r\n    <span class=\"bold\">resume working normally.</span></p>\r\n  <p i18n=\"@@topnav_sessiontimeout_text3\">You will be logged out automatically when the session expires.</p>\r\n  <p class=\"timer-menu-hint\"\r\n      i18n=\"@@topnav_sessiontimeout_text4\">You can restart the timer from the User Menu.</p>\r\n</mat-dialog-content>\r\n<mat-dialog-actions align=\"center\">\r\n  <button color=\"primary\"\r\n      mat-dialog-close=\"Resume\"\r\n      mat-flat-button\r\n      i18n=\"@@topnav_sessiontimeout_resume\"\r\n  >Resume\r\n  </button>\r\n  <button color=\"primary\"\r\n      mat-dialog-close=\"Stop\"\r\n      mat-flat-button\r\n      i18n=\"@@topnav_sessiontimeout_stop\"\r\n  >Stop Timeout\r\n  </button>\r\n</mat-dialog-actions>\r\n" }]
        }], propDecorators: { hostClass: [{
                type: HostBinding,
                args: ['class']
            }] } });

class TopNavigationCacheService {
    constructor() {
        this.storageKeyData = 'muiTopNavData';
        this.storageKeySession = 'muiTopNavSession';
    }
    loadStoredNavigationData() {
        if (this.isCachedSessionIdValid()) {
            const storedData = sessionStorage.getItem(this.storageKeyData);
            if (storedData) {
                return JSON.parse(storedData);
            }
        }
        return null;
    }
    storeNavigationData(data) {
        sessionStorage.setItem(this.storageKeyData, JSON.stringify(data));
        const sessionId = this.getSessionIdFromRequest();
        if (sessionId) {
            sessionStorage.setItem(this.storageKeySession, sessionId);
        }
    }
    invalidateCache() {
        console.log('top navigation: clearing cache');
        sessionStorage.removeItem(this.storageKeySession);
        sessionStorage.removeItem(this.storageKeyData);
    }
    isCachedSessionIdValid() {
        const storedSessionId = sessionStorage.getItem(this.storageKeySession);
        const currentSessionId = this.getSessionIdFromRequest();
        return !!(storedSessionId && currentSessionId && storedSessionId === currentSessionId);
    }
    getSessionIdFromRequest() {
        return window.location.pathname.match(/;jsessionid=[A-F0-9]{32}(?:;[a-z0-9]+)?/)?.[0];
    }
}
TopNavigationCacheService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: TopNavigationCacheService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
TopNavigationCacheService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: TopNavigationCacheService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: TopNavigationCacheService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

class SessionTimerService {
    constructor(http, dialog, cacheService, notificationService) {
        this.http = http;
        this.dialog = dialog;
        this.cacheService = cacheService;
        this.notificationService = notificationService;
        this.isTimeoutActive$ = new BehaviorSubject(true);
        this.isInitialized = false;
        this.timerReset$ = new Subject();
    }
    get isTimeoutActive() {
        return this.isTimeoutActive$.asObservable();
    }
    /**
     * Initialize the service based on the provided configuration
     * @param navItem navigation item for the timer, holding the configuration data
     */
    init(navItem) {
        this.config = navItem.properties;
        this.endpointUrl = navItem.href ?? '';
        if (this.config.keepAlive && !this.config.idleMode) {
            this.startKeepAlive();
        }
        else {
            this.startTimer();
        }
        if (this.config.idleMode) {
            this.onIdleModeActivated();
        }
        this.timerResetListener();
        this.isInitialized = true;
    }
    /**
     * Start the "keep alive" mode.
     * Backend will be pinged periodically (30 seconds) to keep the session alive.
     */
    startKeepAlive(clearCache = false) {
        this.stopTimer();
        this.activeKeepAlive = timer(10, 30000)
            .subscribe(() => {
            this.startKeepAliveReq()
                .subscribe(res => {
                if (res.idleMode) {
                    this.onIdleModeActivated();
                    this.startTimer();
                }
            });
        });
        this.isTimeoutActive$.next(false);
        if (clearCache) {
            this.cacheService.invalidateCache();
        }
    }
    /**
     * Stop the "keep alive" mode and restart the regular timeout monitor.
     */
    stopKeepAlive() {
        this.activeKeepAlive.unsubscribe();
        this.stopKeepAliveReq()
            .subscribe();
        this.startTimer();
        this.isTimeoutActive$.next(true);
        this.cacheService.invalidateCache();
    }
    /**
     * Reset the current timer and start a new countdown.
     * Used by SessionInterceptor
     */
    resetTimer() {
        if (!this.activeKeepAlive || this.activeKeepAlive.closed) {
            this.timerReset$.next();
        }
    }
    timerResetListener() {
        this.timerReset$
            .pipe(debounceTime(10000))
            .subscribe(() => {
            if (this.isInitialized) {
                console.log('session timer reset.');
                this.stopTimer();
                this.startTimer();
            }
        });
    }
    onSessionTimedOut() {
        if (this.notificationService) {
            const notification = {
                type: 'WARNING',
                message: {
                    headline: $localize `:@@topnav_session_expired:Your session expired. You will be redirected to the login page.`
                }
            };
            this.notificationService.addNotification(notification);
        }
    }
    onIdleModeActivated() {
        if (this.notificationService) {
            const notification = {
                type: 'WARNING',
                message: {
                    headline: $localize `:@@topnav_system_restart:Your Engage system will restart shortly due to a server reboot. Please save your work and log out. You can log back in immediately.`
                }
            };
            this.notificationService.addNotification(notification);
        }
    }
    startKeepAliveReq() {
        return this.doRequest(new HttpParams().set('keepAlive', 'true'));
    }
    stopKeepAliveReq() {
        return this.doRequest(new HttpParams().set('keepAlive', 'false'));
    }
    doRequest(params) {
        const isValid = this.endpointUrl.length > 0;
        if (!isValid) {
            console.warn('Endpoint url for session timer is empty. Please check configuration');
            return EMPTY;
        }
        if (params) {
            return this.http.get(this.endpointUrl, { params });
        }
        return this.http.get(this.endpointUrl);
    }
    startTimer() {
        const warningTime = this.config.timeout * (5 / 6); // 25 minutes for 30 min session
        const timeoutTime = this.config.timeout / 6; // 5 minutes for 30 min session
        const warningTimer = timer(warningTime)
            .pipe(mapTo('warning'));
        const expiryTimer = timer(timeoutTime)
            .pipe(mapTo('expired'));
        this.timerSubscription = concat(warningTimer, expiryTimer)
            .subscribe(v => {
            if (v === 'warning') {
                this.showTimeoutWarningDialog();
            }
            if (v === 'expired') {
                this.timerSubscription.unsubscribe();
                this.onSessionTimedOut();
                if (this.config.expiredHref.length > 0) {
                    setTimeout(() => {
                        window.location.assign(this.config.expiredHref);
                    }, 5000);
                }
            }
        });
        if (this.activeKeepAlive && !this.activeKeepAlive.closed) {
            this.stopKeepAliveReq();
        }
    }
    stopTimer() {
        this.timerSubscription?.unsubscribe();
    }
    showTimeoutWarningDialog() {
        const dialogConfig = {
            width: '500px',
            hasBackdrop: true,
            disableClose: true,
            autoFocus: false,
            panelClass: 'mui-timeout-dialog'
        };
        const dialogRef = this.dialog.open(TimeoutDialogComponent, dialogConfig);
        dialogRef.afterClosed()
            .subscribe(res => {
            if (res === 'Stop') {
                this.startKeepAlive(true);
            }
        });
    }
}
SessionTimerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: SessionTimerService, deps: [{ token: i1.HttpClient }, { token: i2.MatDialog }, { token: TopNavigationCacheService }, { token: i3.NotificationService, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
SessionTimerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: SessionTimerService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: SessionTimerService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.MatDialog }, { type: TopNavigationCacheService }, { type: i3.NotificationService, decorators: [{
                    type: Optional
                }] }]; } });

class TopNavigationService {
    constructor(http, cacheService) {
        this.http = http;
        this.cacheService = cacheService;
        this.helpTopicKeys$ = new BehaviorSubject('default');
        this.helpBaseUrl = '';
        this.serviceVersionInfos = [];
        this.activeMenuIdChanges$ = new BehaviorSubject('');
    }
    /** Load navigation data from provided endpoint URL */
    loadNavigationData(apiUrl, disableCache, forceReload) {
        if (!apiUrl) {
            throw new Error('No API URL defined for top navigation component.');
        }
        if (forceReload) {
            this.cacheService.invalidateCache();
        }
        let result$;
        let cached = false;
        const storedData = disableCache ? null : this.cacheService.loadStoredNavigationData();
        if (storedData) {
            cached = true;
            result$ = of(storedData);
        }
        else {
            result$ = this.http.get(apiUrl);
        }
        return result$
            .pipe(tap(navData => {
            this.initHelpLink(navData);
            this.initActiveMenuSection(navData);
            if (!cached && !disableCache) {
                this.cacheService.storeNavigationData(navData);
            }
        }));
    }
    /**
     * Provide a new topic key for context aware deep linking. It will be used the next time when help link is clicked
     * in the help menu.
     * @example
     * updateHelpLink('channels-inapp-list');
     * // resulting link: https://supportlink.mapp.com/redirect?label=Engage_channels-inapp-list&language=en
     * @param topicId the new topic id to use when help link is clicked.
     * Will be prefixed with 'Engage_' in the resulting link
     */
    updateHelpLink(topicId) {
        this.helpTopicKeys$.next(topicId);
    }
    /**
     * Retrieve an updated online help link based on the original one and the current value from the help topics stream.
     * @param helpLink URL for the original help link
     * @exception Fails with TypeError when provided string cannot be parsed as URL
     */
    getUpdatedHelpLink(helpLink) {
        const helpUrl = new URL(helpLink);
        const prefix = 'Engage_';
        if (helpUrl.searchParams.get('label') !== null) {
            let helpTopic = this.helpTopicKeys$.value;
            if (!helpTopic.startsWith(prefix)) {
                helpTopic = prefix + helpTopic;
            }
            helpUrl.searchParams.set('label', helpTopic);
            helpUrl.hash = '';
        }
        return helpUrl.toString();
    }
    /**
     * Get the current help url based on nav data base url and current state based on calls to 'updateHelpLink'.
     * Only works once nav data has been loaded, error thrown otherwise.
     */
    getCurrentHelpUrl() {
        return this.getUpdatedHelpLink(this.helpBaseUrl);
    }
    /** Send a request to backend to change the desired UI language */
    changeUILanguage(url) {
        this.cacheService.invalidateCache();
        // TODO remove once URL in endpoint has been changed to correct format
        const startPageUrl = url.replace('/automated/action.jsp', '/start.jsp');
        window.location.assign(startPageUrl);
    }
    /**
     * An Observable which emits the id of the currently active main navigation section.
     * Changes when user navigates to a new page.
     */
    get activeMenuIdChanges() {
        return this.activeMenuIdChanges$.asObservable();
    }
    /** Return the ID of the active menu section based on the current view */
    get activeNavMenuId() {
        return this.activeMenuIdChanges$.value;
    }
    /** Update the active top nav menu Id. Should be called when navigating to a new page. */
    set activeNavMenuId(menuId) {
        this.activeMenuIdChanges$.next(menuId);
    }
    /**
     * Add info about your service to the "About Engage" dialog. Entries will be added at the bottom of the dialog,
     * after the main content retrieved from aboutEcm.jsp
     * @param info new entry to be added. Needs to be a plain string.
     */
    addServiceVersionInfo(info) {
        this.serviceVersionInfos.push(info);
    }
    /**
     * Retrieve current value for service versions which have been added so far.
     */
    getServiceVersionInfos() {
        return this.serviceVersionInfos;
    }
    /**
     * Extract the help url and make it available to getCurrentHelpUrl.
     * Needed by some Engage legacy use cases.
     */
    initHelpLink(navData) {
        const helpItem = navData.auxNav.find(item => item.id === 'aux-help')
            ?.menu
            ?.find(item => item.id === 'aux-help-onlinehelp');
        this.helpBaseUrl = helpItem?.href ?? '';
    }
    /**
     * Try to find the top navigation section which is currently "active".
     * Based on matching the current window url against all navigation links retrieved from API.
     */
    initActiveMenuSection(navData) {
        const location = window.location.href;
        const findMatchingHref = (data, result) => {
            return data.some(val => {
                result.push(val.id);
                if (location === val?.href) {
                    return true;
                }
                else if (val.menu) {
                    const inner = findMatchingHref(val.menu, result);
                    result.pop();
                    return inner;
                }
                else {
                    result.pop();
                    return false;
                }
            });
        };
        const matchedNavSection = [];
        findMatchingHref(navData.mainNav.slice(1), matchedNavSection);
        if (matchedNavSection[0]) {
            this.activeNavMenuId = matchedNavSection[0];
        }
        else if (location.endsWith('start.jsp')) { // special handling for first arrival on start page after login
            this.activeNavMenuId = 'nav-dashboard';
        }
    }
}
TopNavigationService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: TopNavigationService, deps: [{ token: i1.HttpClient }, { token: TopNavigationCacheService }], target: i0.ɵɵFactoryTarget.Injectable });
TopNavigationService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: TopNavigationService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: TopNavigationService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: TopNavigationCacheService }]; } });

class ProfileMenuComponent {
    constructor(dialog, timerService, topNavService) {
        this.dialog = dialog;
        this.timerService = timerService;
        this.topNavService = topNavService;
        this.isActiveMenu = false;
    }
    ngOnInit() {
        this.initSessionTimer();
        this.setUserInitials();
        this.prepareLanguageMenu();
    }
    onMenuOpened() {
        this.isActiveMenu = true;
    }
    onMenuClosed() {
        this.isActiveMenu = false;
    }
    onItemClicked(menuItem) {
        switch (menuItem.id) {
            case 'aux-user-settings':
                this.openAccountDialog(menuItem);
                break;
            default:
                this.handleGenericClick(menuItem);
        }
    }
    onLangMenuClicked(menuItem) {
        const config = {
            autoFocus: false,
            hasBackdrop: true,
            width: '500px'
        };
        const dialogRef = this.dialog.open(LangChangeDialogComponent, config);
        dialogRef.afterClosed().subscribe(res => {
            if (res === 'change' && menuItem.href) {
                this.topNavService.changeUILanguage(menuItem.href);
            }
        });
    }
    onSubMenuClosed() {
        // intentionally empty, just needed to refresh hover state in menu
    }
    toggleSessionTimer($event) {
        if ($event.checked) {
            this.timerService.stopKeepAlive();
        }
        else {
            this.timerService.startKeepAlive(true);
        }
    }
    openAccountDialog(item) {
        const config = {
            autoFocus: false,
            hasBackdrop: true,
            width: '700px',
            minHeight: 500,
            disableClose: true,
            panelClass: 'mui-top-nav-dialog',
            data: {
                ...item.properties,
                accountSettings: true
            }
        };
        this.dialog.open(TopNavDialogComponent, config);
    }
    handleGenericClick(menuItem) {
        if (menuItem.href) {
            window.location.assign(menuItem.href);
        }
    }
    setUserInitials() {
        const userName = this.navItem?.properties?.['userName'];
        if (userName) {
            this.userInitials = userName.split(' ')
                .reduce((prev, current) => {
                return prev + current.substring(0, 1);
            }, '');
        }
    }
    initSessionTimer() {
        const config = this.navItem?.menu?.find(itm => itm.id === 'aux-timer');
        if (config) {
            this.timerService.init(config);
        }
        this.isTimeoutActive$ = this.timerService.isTimeoutActive;
    }
    prepareLanguageMenu() {
        const mainLangEntry = this.navItem?.menu?.find(itm => itm.id === 'aux-user-lang');
        if (mainLangEntry && mainLangEntry.properties && mainLangEntry.menu) {
            const currentLangId = mainLangEntry.properties['currentLanguageId'];
            const index = mainLangEntry.menu.findIndex(i => i.id === currentLangId);
            if (index > -1) {
                const currentLangEntry = mainLangEntry.menu.splice(index, 1)[0];
                mainLangEntry.name = currentLangEntry.name;
            }
        }
    }
}
ProfileMenuComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: ProfileMenuComponent, deps: [{ token: i2.MatDialog }, { token: SessionTimerService }, { token: TopNavigationService }], target: i0.ɵɵFactoryTarget.Component });
ProfileMenuComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: ProfileMenuComponent, selector: "mui-profile-menu", inputs: { navItem: "navItem" }, ngImport: i0, template: "<button (menuClosed)=\"onMenuClosed()\"\r\n    (menuOpened)=\"onMenuOpened()\"\r\n    *ngIf=\"navItem.icon\"\r\n    [class.active]=\"isActiveMenu\"\r\n    [matMenuTriggerFor]=\"level2\"\r\n    class=\"mui-navitem-icon-btn\"\r\n    mat-icon-button\r\n    [id]=\"navItem.id\"\r\n>\r\n  <span *ngIf=\"!userInitials\"\r\n      class=\"mui-icons\">{{ navItem.icon }}</span>\r\n  <span *ngIf=\"userInitials\"\r\n      class=\"initials\">{{ userInitials }}</span>\r\n</button>\r\n\r\n<mat-menu #level2=\"matMenu\"\r\n    class=\"mui-navitem-menu\">\r\n  <ng-container *ngFor=\"let menuItem of navItem.menu\">\r\n    <ng-container [ngSwitch]=\"menuItem.id\">\r\n      <button *ngSwitchCase=\"'aux-user-lang'\"\r\n          [matMenuTriggerData]=\"{items: menuItem.menu}\"\r\n          [matMenuTriggerFor]=\"level3\"\r\n          class=\"mui-navitem-button\"\r\n          mat-menu-item\r\n          (menuClosed)=\"onSubMenuClosed()\"\r\n          [id]=\"'2-' + menuItem.id\"\r\n      >\r\n        <span>{{ menuItem.name }}</span>\r\n      </button>\r\n      <div *ngSwitchCase=\"'aux-timer'\"\r\n          class=\"mui-navitem-button\"\r\n          mat-menu-item\r\n          [id]=\"'2-' + menuItem.id\"\r\n      >\r\n        <mat-slide-toggle\r\n            (change)=\"toggleSessionTimer($event)\"\r\n            [checked]=\"isTimeoutActive$ | async\"\r\n            color=\"primary\"\r\n            labelPosition=\"before\"\r\n        >{{ menuItem.name }}</mat-slide-toggle>\r\n      </div>\r\n      <button *ngSwitchDefault\r\n          (click)=\"onItemClicked(menuItem)\"\r\n          class=\"mui-navitem-button\"\r\n          mat-menu-item\r\n          [id]=\"'2-' + menuItem.id\"\r\n      >\r\n        <span>{{ menuItem.name }}</span>\r\n      </button>\r\n    </ng-container>\r\n  </ng-container>\r\n</mat-menu>\r\n\r\n<mat-menu #level3=\"matMenu\"\r\n    class=\"mui-navitem-menu\">\r\n  <ng-template let-items=\"items\"\r\n      matMenuContent>\r\n    <button (click)=\"onLangMenuClicked(itm)\"\r\n        *ngFor=\"let itm of items\"\r\n        class=\"mui-navitem-button\"\r\n        mat-menu-item\r\n        [id]=\"'3-' + itm.id\"\r\n    >{{ itm.name}}</button>\r\n  </ng-template>\r\n</mat-menu>\r\n", styles: [":host{display:block;width:48px;height:100%}.mui-auxnav-button{width:100%;height:100%;border-radius:0}.mui-navitem-icon-btn{width:48px;height:100%;border-radius:0}#aux-user{padding:0}.initials{font-size:14px;font-weight:400;font-family:Open Sans,sans-serif;display:inline-block;width:32px;height:32px;border-radius:50%;line-height:32px;position:relative;top:-2px}.mui-navitem-button{font-size:16px;font-weight:400;letter-spacing:.02px}\n"], dependencies: [{ kind: "directive", type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i4.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i4.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "directive", type: i4.NgSwitchDefault, selector: "[ngSwitchDefault]" }, { kind: "component", type: i5.MatMenu, selector: "mat-menu", exportAs: ["matMenu"] }, { kind: "component", type: i5.MatMenuItem, selector: "[mat-menu-item]", inputs: ["disabled", "disableRipple", "role"], exportAs: ["matMenuItem"] }, { kind: "directive", type: i5.MatMenuContent, selector: "ng-template[matMenuContent]" }, { kind: "directive", type: i5.MatMenuTrigger, selector: "[mat-menu-trigger-for], [matMenuTriggerFor]", exportAs: ["matMenuTrigger"] }, { kind: "component", type: i6.MatIconButton, selector: "button[mat-icon-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "component", type: i8$2.MatSlideToggle, selector: "mat-slide-toggle", inputs: ["disabled", "disableRipple", "color", "tabIndex"], exportAs: ["matSlideToggle"] }, { kind: "pipe", type: i4.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: ProfileMenuComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mui-profile-menu', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button (menuClosed)=\"onMenuClosed()\"\r\n    (menuOpened)=\"onMenuOpened()\"\r\n    *ngIf=\"navItem.icon\"\r\n    [class.active]=\"isActiveMenu\"\r\n    [matMenuTriggerFor]=\"level2\"\r\n    class=\"mui-navitem-icon-btn\"\r\n    mat-icon-button\r\n    [id]=\"navItem.id\"\r\n>\r\n  <span *ngIf=\"!userInitials\"\r\n      class=\"mui-icons\">{{ navItem.icon }}</span>\r\n  <span *ngIf=\"userInitials\"\r\n      class=\"initials\">{{ userInitials }}</span>\r\n</button>\r\n\r\n<mat-menu #level2=\"matMenu\"\r\n    class=\"mui-navitem-menu\">\r\n  <ng-container *ngFor=\"let menuItem of navItem.menu\">\r\n    <ng-container [ngSwitch]=\"menuItem.id\">\r\n      <button *ngSwitchCase=\"'aux-user-lang'\"\r\n          [matMenuTriggerData]=\"{items: menuItem.menu}\"\r\n          [matMenuTriggerFor]=\"level3\"\r\n          class=\"mui-navitem-button\"\r\n          mat-menu-item\r\n          (menuClosed)=\"onSubMenuClosed()\"\r\n          [id]=\"'2-' + menuItem.id\"\r\n      >\r\n        <span>{{ menuItem.name }}</span>\r\n      </button>\r\n      <div *ngSwitchCase=\"'aux-timer'\"\r\n          class=\"mui-navitem-button\"\r\n          mat-menu-item\r\n          [id]=\"'2-' + menuItem.id\"\r\n      >\r\n        <mat-slide-toggle\r\n            (change)=\"toggleSessionTimer($event)\"\r\n            [checked]=\"isTimeoutActive$ | async\"\r\n            color=\"primary\"\r\n            labelPosition=\"before\"\r\n        >{{ menuItem.name }}</mat-slide-toggle>\r\n      </div>\r\n      <button *ngSwitchDefault\r\n          (click)=\"onItemClicked(menuItem)\"\r\n          class=\"mui-navitem-button\"\r\n          mat-menu-item\r\n          [id]=\"'2-' + menuItem.id\"\r\n      >\r\n        <span>{{ menuItem.name }}</span>\r\n      </button>\r\n    </ng-container>\r\n  </ng-container>\r\n</mat-menu>\r\n\r\n<mat-menu #level3=\"matMenu\"\r\n    class=\"mui-navitem-menu\">\r\n  <ng-template let-items=\"items\"\r\n      matMenuContent>\r\n    <button (click)=\"onLangMenuClicked(itm)\"\r\n        *ngFor=\"let itm of items\"\r\n        class=\"mui-navitem-button\"\r\n        mat-menu-item\r\n        [id]=\"'3-' + itm.id\"\r\n    >{{ itm.name}}</button>\r\n  </ng-template>\r\n</mat-menu>\r\n", styles: [":host{display:block;width:48px;height:100%}.mui-auxnav-button{width:100%;height:100%;border-radius:0}.mui-navitem-icon-btn{width:48px;height:100%;border-radius:0}#aux-user{padding:0}.initials{font-size:14px;font-weight:400;font-family:Open Sans,sans-serif;display:inline-block;width:32px;height:32px;border-radius:50%;line-height:32px;position:relative;top:-2px}.mui-navitem-button{font-size:16px;font-weight:400;letter-spacing:.02px}\n"] }]
        }], ctorParameters: function () { return [{ type: i2.MatDialog }, { type: SessionTimerService }, { type: TopNavigationService }]; }, propDecorators: { navItem: [{
                type: Input
            }] } });

class SearchComponent {
    constructor() {
        this.isSearchOpen = false;
    }
    onSearchTermEntered(value) {
        const searchQuery = this.navItem.href + encodeURIComponent(value);
        window.location.assign(searchQuery);
    }
}
SearchComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: SearchComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
SearchComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: SearchComponent, selector: "mui-search", inputs: { navItem: "navItem" }, ngImport: i0, template: "<button #trigger=\"cdkOverlayOrigin\"\r\n    (click)=\"isSearchOpen = !isSearchOpen\"\r\n    [class.active]=\"isSearchOpen\"\r\n    cdkOverlayOrigin\r\n    class=\"mui-auxnav-button\"\r\n    mat-icon-button\r\n    [id]=\"navItem.id\"\r\n>\r\n  <span class=\"mui-icons\">{{ navItem.icon }}</span>\r\n</button>\r\n\r\n<ng-template\r\n    (overlayOutsideClick)=\"isSearchOpen = false\"\r\n    [cdkConnectedOverlayOpen]=\"isSearchOpen\"\r\n    [cdkConnectedOverlayOrigin]=\"trigger\"\r\n    cdkConnectedOverlay\r\n>\r\n  <div class=\"mui-aux-search-panel\"\r\n      cdkTrapFocus\r\n      [cdkTrapFocusAutoCapture]=\"true\"\r\n  >\r\n    <mat-form-field appearance=\"outline\"\r\n        class=\"mui-aux-search-field\">\r\n      <input #search\r\n          (keyup.enter)=\"onSearchTermEntered(search.value)\"\r\n          matInput\r\n          placeholder=\"Search\"\r\n          i18n-placeholder=\"placeholder on search input@@topnav_search_placeholder\"\r\n          cdkFocusInitial\r\n      />\r\n      <button *ngIf=\"search.value !== ''\"\r\n          (click)=\"search.value = ''\"\r\n          aria-label=\"Clear search\"\r\n          mat-icon-button\r\n          matIconSuffix>\r\n        <span class=\"mui-icons search-clear-icon\">close</span>\r\n      </button>\r\n\r\n    </mat-form-field>\r\n  </div>\r\n\r\n</ng-template>\r\n", styles: [":host{display:block;width:48px;height:100%}.mui-auxnav-button{width:100%;height:100%;border-radius:0}.mui-aux-search-panel{padding:.25em}.mui-aux-search-field{width:280px;font-size:14px}.search-clear-icon{font-size:14px;margin:auto;display:block;height:1.357em;line-height:1.357}\n"], dependencies: [{ kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i6.MatIconButton, selector: "button[mat-icon-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "directive", type: i8.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { kind: "component", type: i8$1.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i8$1.MatSuffix, selector: "[matSuffix], [matIconSuffix], [matTextSuffix]", inputs: ["matTextSuffix"] }, { kind: "directive", type: i5$2.CdkConnectedOverlay, selector: "[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]", inputs: ["cdkConnectedOverlayOrigin", "cdkConnectedOverlayPositions", "cdkConnectedOverlayPositionStrategy", "cdkConnectedOverlayOffsetX", "cdkConnectedOverlayOffsetY", "cdkConnectedOverlayWidth", "cdkConnectedOverlayHeight", "cdkConnectedOverlayMinWidth", "cdkConnectedOverlayMinHeight", "cdkConnectedOverlayBackdropClass", "cdkConnectedOverlayPanelClass", "cdkConnectedOverlayViewportMargin", "cdkConnectedOverlayScrollStrategy", "cdkConnectedOverlayOpen", "cdkConnectedOverlayDisableClose", "cdkConnectedOverlayTransformOriginOn", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayLockPosition", "cdkConnectedOverlayFlexibleDimensions", "cdkConnectedOverlayGrowAfterOpen", "cdkConnectedOverlayPush"], outputs: ["backdropClick", "positionChange", "attach", "detach", "overlayKeydown", "overlayOutsideClick"], exportAs: ["cdkConnectedOverlay"] }, { kind: "directive", type: i5$2.CdkOverlayOrigin, selector: "[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]", exportAs: ["cdkOverlayOrigin"] }, { kind: "directive", type: i6$1.CdkTrapFocus, selector: "[cdkTrapFocus]", inputs: ["cdkTrapFocus", "cdkTrapFocusAutoCapture"], exportAs: ["cdkTrapFocus"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: SearchComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mui-search', template: "<button #trigger=\"cdkOverlayOrigin\"\r\n    (click)=\"isSearchOpen = !isSearchOpen\"\r\n    [class.active]=\"isSearchOpen\"\r\n    cdkOverlayOrigin\r\n    class=\"mui-auxnav-button\"\r\n    mat-icon-button\r\n    [id]=\"navItem.id\"\r\n>\r\n  <span class=\"mui-icons\">{{ navItem.icon }}</span>\r\n</button>\r\n\r\n<ng-template\r\n    (overlayOutsideClick)=\"isSearchOpen = false\"\r\n    [cdkConnectedOverlayOpen]=\"isSearchOpen\"\r\n    [cdkConnectedOverlayOrigin]=\"trigger\"\r\n    cdkConnectedOverlay\r\n>\r\n  <div class=\"mui-aux-search-panel\"\r\n      cdkTrapFocus\r\n      [cdkTrapFocusAutoCapture]=\"true\"\r\n  >\r\n    <mat-form-field appearance=\"outline\"\r\n        class=\"mui-aux-search-field\">\r\n      <input #search\r\n          (keyup.enter)=\"onSearchTermEntered(search.value)\"\r\n          matInput\r\n          placeholder=\"Search\"\r\n          i18n-placeholder=\"placeholder on search input@@topnav_search_placeholder\"\r\n          cdkFocusInitial\r\n      />\r\n      <button *ngIf=\"search.value !== ''\"\r\n          (click)=\"search.value = ''\"\r\n          aria-label=\"Clear search\"\r\n          mat-icon-button\r\n          matIconSuffix>\r\n        <span class=\"mui-icons search-clear-icon\">close</span>\r\n      </button>\r\n\r\n    </mat-form-field>\r\n  </div>\r\n\r\n</ng-template>\r\n", styles: [":host{display:block;width:48px;height:100%}.mui-auxnav-button{width:100%;height:100%;border-radius:0}.mui-aux-search-panel{padding:.25em}.mui-aux-search-field{width:280px;font-size:14px}.search-clear-icon{font-size:14px;margin:auto;display:block;height:1.357em;line-height:1.357}\n"] }]
        }], propDecorators: { navItem: [{
                type: Input
            }] } });

class TopNavMenuComponent {
    constructor(dialog, service, document, router) {
        this.dialog = dialog;
        this.service = service;
        this.document = document;
        this.router = router;
        this.hostClassName = 'mui-top-nav-menu';
        this.isActiveMenu = false;
        this.baseHref = this.document.getElementsByTagName('base')?.[0]?.href;
    }
    onItemClicked(menuItem, event) {
        event.preventDefault();
        if (menuItem.id === 'aux-help-onlinehelp' && menuItem.href) {
            this.openHelpLink(menuItem.href);
        }
        else if (menuItem.properties?.['blank']) {
            window.open(menuItem.href);
        }
        else if (menuItem.properties?.['modal']) {
            this.openDialog(menuItem);
        }
        else if (menuItem.href) {
            this.navigateTo(menuItem.href);
        }
    }
    onMenuOpened() {
        this.isActiveMenu = true;
    }
    onMenuClosed() {
        this.isActiveMenu = false;
    }
    onSubMenuClosed() {
        // intentionally empty, just needed to refresh hover state in menu
    }
    ngOnInit() {
        this.isHighlightedMenu = this.service.activeMenuIdChanges
            .pipe(map(val => this.navItem.id === val));
    }
    /**
     * Navigate to a different view in Engage.
     * Navigation target and methodology is resolved by following logic:
     * 1. If target link has same base href as the document, strip it from the link to have path only
     * 2. If target link had no match for base href, or no router available, set location to target link
     * 3. Try to use the Angular router to navigate to the url (fragment)
     * 4. If router navigation failed, assign location
     */
    navigateTo(url) {
        this.service.activeNavMenuId = this.navItem.id;
        const routingPath = url.replace(this.baseHref, '');
        if (/https?:\/{2}/.test(routingPath) || this.router.config.length === 0) {
            window.location.assign(url);
        }
        else {
            const parsedUrl = this.router.parseUrl(routingPath);
            const navigateResult = this.router.navigateByUrl(parsedUrl.fragment ?? parsedUrl);
            navigateResult.catch(() => {
                window.location.assign(url);
            });
        }
    }
    openDialog(menuItem) {
        const config = {
            width: '600px',
            height: '500px',
            autoFocus: false,
            data: {
                title: menuItem.properties?.['title'],
                srcUrl: menuItem.href,
                additionalContent: this.service.getServiceVersionInfos()
            }
        };
        this.dialog.open(TopNavDialogComponent, config);
    }
    openHelpLink(url) {
        try {
            const updatedHelpLink = this.service.getUpdatedHelpLink(url);
            window.open(updatedHelpLink);
        }
        catch (e) {
            console.error('help link malformed', e);
        }
    }
}
TopNavMenuComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: TopNavMenuComponent, deps: [{ token: i2.MatDialog }, { token: TopNavigationService }, { token: DOCUMENT }, { token: i2$1.Router }], target: i0.ɵɵFactoryTarget.Component });
TopNavMenuComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: TopNavMenuComponent, selector: "mui-top-nav-menu", inputs: { navItem: "navItem" }, host: { properties: { "class": "this.hostClassName" } }, ngImport: i0, template: "<div *ngIf=\"navItem.icon && navItem.href\"\r\n    class=\"mui-navitem-icon\">\r\n  <a [href]=\"navItem.href\"\r\n      [id]=\"navItem.id\"\r\n  >\r\n    <span class=\"mui-icons\">{{ navItem.icon }}</span>\r\n  </a>\r\n</div>\r\n\r\n<button (menuClosed)=\"onMenuClosed()\"\r\n    (menuOpened)=\"onMenuOpened()\"\r\n    *ngIf=\"navItem.icon && navItem.menu\"\r\n    [class.active]=\"isActiveMenu || (isHighlightedMenu | async)\"\r\n    [matMenuTriggerFor]=\"level2\"\r\n    class=\"mui-navitem-icon-btn\"\r\n    mat-icon-button\r\n    [id]=\"navItem.id\"\r\n>\r\n  <span class=\"mui-icons\">{{ navItem.icon }}</span>\r\n</button>\r\n\r\n<button (menuClosed)=\"onMenuClosed()\"\r\n    (menuOpened)=\"onMenuOpened()\"\r\n    *ngIf=\"navItem.name\"\r\n    [class.active]=\"isActiveMenu || (isHighlightedMenu | async)\"\r\n    [matMenuTriggerFor]=\"level2\"\r\n    class=\"mui-navitem-parent\"\r\n    mat-button\r\n    [id]=\"navItem.id\"\r\n>\r\n  <span>{{ navItem.name }}</span>\r\n  <span class=\"mui-icons\">chevron_down</span>\r\n</button>\r\n\r\n<mat-menu #level2=\"matMenu\"\r\n    class=\"mui-navitem-menu\">\r\n  <ng-container *ngFor=\"let menuItem of navItem.menu\">\r\n    <a (click)=\"onItemClicked(menuItem, $event)\"\r\n        *ngIf=\"menuItem.href\"\r\n        class=\"mui-navitem-button\"\r\n        mat-menu-item\r\n        [id]=\"'2-' + menuItem.id\"\r\n        [href]=\"menuItem.href\"\r\n    >\r\n      <span *ngIf=\"menuItem.icon\"\r\n          class=\"mui-icons\">{{ menuItem.icon }}</span>\r\n      <span>{{ menuItem.name }}</span>\r\n    </a>\r\n    <button *ngIf=\"menuItem.menu\"\r\n        [matMenuTriggerData]=\"{items: menuItem.menu}\"\r\n        [matMenuTriggerFor]=\"level3\"\r\n        class=\"mui-navitem-button\"\r\n        mat-menu-item\r\n        (menuClosed)=\"onSubMenuClosed()\"\r\n        [id]=\"'2-' + menuItem.id\"\r\n    >\r\n      <span>{{ menuItem.name }}</span>\r\n    </button>\r\n\r\n  </ng-container>\r\n</mat-menu>\r\n\r\n<mat-menu #level3=\"matMenu\"\r\n    class=\"mui-navitem-menu\">\r\n  <ng-template let-items=\"items\"\r\n    matMenuContent>\r\n    <a (click)=\"onItemClicked(itm, $event)\"\r\n        *ngFor=\"let itm of items\"\r\n        class=\"mui-navitem-button\"\r\n        mat-menu-item\r\n        [id]=\"'3-' + itm.id\"\r\n        [href]=\"itm.href\"\r\n    >{{ itm.name}}</a>\r\n  </ng-template>\r\n</mat-menu>\r\n\r\n", styles: [":host{display:block;height:100%}.mui-navitem-icon{width:48px;height:100%}.mui-navitem-icon a{color:#fff;display:inline-block;position:relative;top:13px;left:12px}.mui-navitem-icon-btn{width:48px;height:100%;border-radius:0}.mui-navitem-parent{font-size:16px;font-weight:600;height:48px;border-radius:0;letter-spacing:.02px;padding:0 8px;margin:0 2px;white-space:nowrap}.mui-navitem-parent .mui-icons{font-size:12px;margin-left:8px}.mui-navitem-button{font-size:16px;font-weight:400;letter-spacing:.02px}\n"], dependencies: [{ kind: "directive", type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i5.MatMenu, selector: "mat-menu", exportAs: ["matMenu"] }, { kind: "component", type: i5.MatMenuItem, selector: "[mat-menu-item]", inputs: ["disabled", "disableRipple", "role"], exportAs: ["matMenuItem"] }, { kind: "directive", type: i5.MatMenuContent, selector: "ng-template[matMenuContent]" }, { kind: "directive", type: i5.MatMenuTrigger, selector: "[mat-menu-trigger-for], [matMenuTriggerFor]", exportAs: ["matMenuTrigger"] }, { kind: "component", type: i6.MatButton, selector: "    button[mat-button], button[mat-raised-button], button[mat-flat-button],    button[mat-stroked-button]  ", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "component", type: i6.MatIconButton, selector: "button[mat-icon-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "pipe", type: i4.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: TopNavMenuComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mui-top-nav-menu', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div *ngIf=\"navItem.icon && navItem.href\"\r\n    class=\"mui-navitem-icon\">\r\n  <a [href]=\"navItem.href\"\r\n      [id]=\"navItem.id\"\r\n  >\r\n    <span class=\"mui-icons\">{{ navItem.icon }}</span>\r\n  </a>\r\n</div>\r\n\r\n<button (menuClosed)=\"onMenuClosed()\"\r\n    (menuOpened)=\"onMenuOpened()\"\r\n    *ngIf=\"navItem.icon && navItem.menu\"\r\n    [class.active]=\"isActiveMenu || (isHighlightedMenu | async)\"\r\n    [matMenuTriggerFor]=\"level2\"\r\n    class=\"mui-navitem-icon-btn\"\r\n    mat-icon-button\r\n    [id]=\"navItem.id\"\r\n>\r\n  <span class=\"mui-icons\">{{ navItem.icon }}</span>\r\n</button>\r\n\r\n<button (menuClosed)=\"onMenuClosed()\"\r\n    (menuOpened)=\"onMenuOpened()\"\r\n    *ngIf=\"navItem.name\"\r\n    [class.active]=\"isActiveMenu || (isHighlightedMenu | async)\"\r\n    [matMenuTriggerFor]=\"level2\"\r\n    class=\"mui-navitem-parent\"\r\n    mat-button\r\n    [id]=\"navItem.id\"\r\n>\r\n  <span>{{ navItem.name }}</span>\r\n  <span class=\"mui-icons\">chevron_down</span>\r\n</button>\r\n\r\n<mat-menu #level2=\"matMenu\"\r\n    class=\"mui-navitem-menu\">\r\n  <ng-container *ngFor=\"let menuItem of navItem.menu\">\r\n    <a (click)=\"onItemClicked(menuItem, $event)\"\r\n        *ngIf=\"menuItem.href\"\r\n        class=\"mui-navitem-button\"\r\n        mat-menu-item\r\n        [id]=\"'2-' + menuItem.id\"\r\n        [href]=\"menuItem.href\"\r\n    >\r\n      <span *ngIf=\"menuItem.icon\"\r\n          class=\"mui-icons\">{{ menuItem.icon }}</span>\r\n      <span>{{ menuItem.name }}</span>\r\n    </a>\r\n    <button *ngIf=\"menuItem.menu\"\r\n        [matMenuTriggerData]=\"{items: menuItem.menu}\"\r\n        [matMenuTriggerFor]=\"level3\"\r\n        class=\"mui-navitem-button\"\r\n        mat-menu-item\r\n        (menuClosed)=\"onSubMenuClosed()\"\r\n        [id]=\"'2-' + menuItem.id\"\r\n    >\r\n      <span>{{ menuItem.name }}</span>\r\n    </button>\r\n\r\n  </ng-container>\r\n</mat-menu>\r\n\r\n<mat-menu #level3=\"matMenu\"\r\n    class=\"mui-navitem-menu\">\r\n  <ng-template let-items=\"items\"\r\n    matMenuContent>\r\n    <a (click)=\"onItemClicked(itm, $event)\"\r\n        *ngFor=\"let itm of items\"\r\n        class=\"mui-navitem-button\"\r\n        mat-menu-item\r\n        [id]=\"'3-' + itm.id\"\r\n        [href]=\"itm.href\"\r\n    >{{ itm.name}}</a>\r\n  </ng-template>\r\n</mat-menu>\r\n\r\n", styles: [":host{display:block;height:100%}.mui-navitem-icon{width:48px;height:100%}.mui-navitem-icon a{color:#fff;display:inline-block;position:relative;top:13px;left:12px}.mui-navitem-icon-btn{width:48px;height:100%;border-radius:0}.mui-navitem-parent{font-size:16px;font-weight:600;height:48px;border-radius:0;letter-spacing:.02px;padding:0 8px;margin:0 2px;white-space:nowrap}.mui-navitem-parent .mui-icons{font-size:12px;margin-left:8px}.mui-navitem-button{font-size:16px;font-weight:400;letter-spacing:.02px}\n"] }]
        }], ctorParameters: function () { return [{ type: i2.MatDialog }, { type: TopNavigationService }, { type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i2$1.Router }]; }, propDecorators: { hostClassName: [{
                type: HostBinding,
                args: ['class']
            }], navItem: [{
                type: Input
            }] } });

/**
 * This component creates a top navigation bar with main and aux nav section.
 * Data for the navigation structure to use is loaded from the provided endpoint url.
 */
class MuiTopNavigationComponent {
    constructor(service, ruler, elementRef, cd) {
        this.service = service;
        this.ruler = ruler;
        this.elementRef = elementRef;
        this.cd = cd;
        this.hostClassName = 'mui-top-navigation';
        /**
         * Navigation component caches its data by default for better performance.
         * The cache can be disabled by setting this property to true.
         */
        this.disableCache = false;
        /** controls visibility of the pagination controls */
        this.showPaginationControls = false;
        /** disabled state for paginator on the left side */
        this.disableScrollBefore = false;
        /** disabled state for paginator on the right side */
        this.disableScrollAfter = false;
        this.ghostList = [...Array(10).keys()];
        this.destroyed$ = new Subject();
        this._scrollPosition = 0;
    }
    get scrollPosition() {
        return this._scrollPosition;
    }
    set scrollPosition(value) {
        this.scrollTo(value);
    }
    ngOnInit() {
        // check for loginAsSystemUser action and force data reload in this case
        const queryParams = new URLSearchParams(window.location.search);
        const actionParam = queryParams.get('action');
        const forceReload = actionParam === 'loginAsSystemUser';
        this.navData$ = this.service.loadNavigationData(this.apiUrl, this.disableCache, forceReload)
            .pipe(tap({
            complete: () => {
                this.initResizeMonitor();
                // give a bit time for rendering to finish and container to be available
                setTimeout(() => this.updatePagination(), 100);
            }
        }));
    }
    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
    /** click handler for the pagination controls in the template */
    onPaginatorClicked(direction) {
        this.scrollMenu(direction);
        this.updatePagination();
    }
    initResizeMonitor() {
        if (this.disablePagination) {
            return;
        }
        const resize = this.ruler.change(250);
        const realign = () => {
            this.updatePagination();
        };
        resize.pipe(takeUntil(this.destroyed$))
            .subscribe(() => {
            Promise.resolve()
                .then(realign);
        });
    }
    /** Main update call which bundles all necessary operations regarding scrolling */
    updatePagination() {
        this.checkPaginationEnabled();
        this.checkScrollingControls();
        this.updateScrollPosition();
    }
    /** check if pagination controls should be visible */
    checkPaginationEnabled() {
        if (this.disablePagination) {
            this.showPaginationControls = false;
        }
        else {
            const isEnabled = this.navItemsContainer.nativeElement.scrollWidth >
                this.navItemsContainer.nativeElement.offsetWidth;
            if (!isEnabled) {
                this.scrollPosition = 0;
            }
            if (isEnabled !== this.showPaginationControls) {
                this.cd.markForCheck();
            }
            this.showPaginationControls = isEnabled;
        }
    }
    /**
     * Update scrolling position to given value. Constrained by container boundaries.
     * @param position new scrolling position to set.
     */
    scrollTo(position) {
        if (this.disablePagination) {
            return;
        }
        const maxScrollDistance = this.getMaxScrollDistance();
        this._scrollPosition = Math.max(0, Math.min(maxScrollDistance, position));
        this.checkScrollingControls();
    }
    /** Scroll the menu in either left or right direction */
    scrollMenu(direction) {
        const viewLength = this.navItemsContainer.nativeElement.offsetWidth;
        // set the scrolling amount to 1/4 of the container width
        const scrollAmount = (direction === 'before' ? -1 : 1) * viewLength / 4;
        const scrollPosition = this.scrollPosition + scrollAmount;
        this.scrollTo(scrollPosition);
    }
    /** Check if left or right scrolling control should be disabled based on the current scrolling position */
    checkScrollingControls() {
        if (this.disablePagination) {
            this.disableScrollAfter = this.disableScrollBefore = true;
        }
        else {
            this.disableScrollBefore = this.scrollPosition === 0;
            const max = this.getMaxScrollDistance();
            this.disableScrollAfter = this.scrollPosition === max;
            this.cd.markForCheck();
        }
    }
    /** Calculate maximum scroll distance based on container size of the nav menu items */
    getMaxScrollDistance() {
        const navMenusWidth = this.navItemsContainer.nativeElement.scrollWidth;
        const viewWidth = this.navItemsContainer.nativeElement.offsetWidth;
        return (navMenusWidth - viewWidth) || 0;
    }
    /** Performs the actual scrolling based on currently set scroll position */
    updateScrollPosition() {
        if (this.disablePagination) {
            return;
        }
        const scrollOptions = {
            left: this.scrollPosition,
            top: 0,
            behavior: 'smooth'
        };
        this.navItemsContainer.nativeElement.scrollTo(scrollOptions);
    }
}
MuiTopNavigationComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiTopNavigationComponent, deps: [{ token: TopNavigationService }, { token: i5$2.ViewportRuler }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
MuiTopNavigationComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: MuiTopNavigationComponent, selector: "mui-top-navigation", inputs: { apiUrl: "apiUrl", notificationCenter: "notificationCenter", disablePagination: "disablePagination", disableCache: "disableCache" }, host: { properties: { "class": "this.hostClassName" } }, viewQueries: [{ propertyName: "navItemsContainer", first: true, predicate: ["navItemsList"], descendants: true }], exportAs: ["muiTopNavigation"], ngImport: i0, template: "<ng-container *ngIf=\"navData$ | async as navData; else ghosts\">\r\n  <mui-top-nav-menu\r\n      [navItem]=\"navData.mainNav[0]\"></mui-top-nav-menu>\r\n\r\n  <nav class=\"mui-main-nav-container\"\r\n      @fadeInOut>\r\n    <button\r\n        class=\"mui-main-nav-pagination\"\r\n        [class.mui-main-nav-pagination-disabled]=\"disableScrollBefore\"\r\n        [class.mui-main-nav-pagination-visible]=\"showPaginationControls\"\r\n        [disabled]=\"disableScrollBefore\"\r\n        mat-icon-button\r\n        aria-hidden=\"true\"\r\n        (click)=\"onPaginatorClicked('before')\"\r\n    >\r\n      <span class=\"mui-icons\">chevron_left</span>\r\n    </button>\r\n\r\n    <div #navItemsList\r\n        class=\"mui-main-nav-items-container\">\r\n      <ng-container *ngFor=\"let navItem of navData.mainNav; let i = index\">\r\n        <mui-top-nav-menu *ngIf=\"i > 0\"\r\n            [navItem]=\"navItem\"></mui-top-nav-menu>\r\n      </ng-container>\r\n    </div>\r\n\r\n    <button\r\n        class=\"mui-main-nav-pagination\"\r\n        [class.mui-main-nav-pagination-disabled]=\"disableScrollAfter\"\r\n        [class.mui-main-nav-pagination-visible]=\"showPaginationControls\"\r\n        [disabled]=\"disableScrollAfter\"\r\n        mat-icon-button\r\n        aria-hidden=\"true\"\r\n        (click)=\"onPaginatorClicked('after')\"\r\n    >\r\n      <span class=\"mui-icons\">chevron_right</span>\r\n    </button>\r\n  </nav>\r\n  <nav class=\"mui-aux-nav-container\"\r\n      @fadeInOut>\r\n    <ng-container *ngFor=\"let navItem of navData.auxNav\"\r\n        [ngSwitch]=\"navItem.id\"\r\n    >\r\n      <mui-notification-bell\r\n          *ngSwitchCase=\"'aux-notification'\"\r\n          [navItem]=\"navItem\"\r\n          [notificationCenter]=\"notificationCenter\"\r\n      ></mui-notification-bell>\r\n      <mui-search *ngSwitchCase=\"'aux-search'\"\r\n          [navItem]=\"navItem\"></mui-search>\r\n      <mui-profile-menu *ngSwitchCase=\"'aux-user'\"\r\n          [navItem]=\"navItem\"></mui-profile-menu>\r\n      <mui-top-nav-menu *ngSwitchDefault\r\n          [navItem]=\"navItem\"></mui-top-nav-menu>\r\n    </ng-container>\r\n  </nav>\r\n</ng-container>\r\n<ng-template #ghosts>\r\n  <div class=\"nav-ghosts-container\"\r\n      @fadeInOut>\r\n    <div class=\"menu-icon-ghost\">\r\n      <span class=\"mui-icons\">mapp_m</span>\r\n    </div>\r\n    <div *ngFor=\"let g of ghostList\"\r\n        class=\"menu-ghost\"\r\n    ></div>\r\n  </div>\r\n</ng-template>\r\n", styles: ["@keyframes ghost-lines{0%{background-position:0}to{background-position:80vw}}:host{display:flex;height:48px;width:100%}.mui-main-nav-container{display:flex;height:48px;flex-grow:1;flex-shrink:1;overflow:hidden}.mui-aux-nav-container{width:250px;height:48px;display:flex;justify-content:flex-end}.mui-main-nav-pagination{height:100%;width:24px;display:none;border-radius:0;padding:12px 0}.mui-main-nav-pagination-visible{display:initial}.mui-main-nav-items-container{display:flex;overflow:hidden;flex-grow:1;flex-shrink:1}.nav-ghosts-container{display:flex;align-items:center;position:fixed;width:calc(100% - 250px)}.menu-ghost{width:8.5%;height:20px;margin:0 2px;background-image:linear-gradient(90deg,#78859d 0px,#8696b2 40px,#78859d 80px);background-size:80vw;animation:ghost-lines 1.5s infinite linear}.menu-icon-ghost{width:48px;height:48px}.menu-icon-ghost span{color:#fff;display:inline-block;position:relative;top:8px;left:12px}\n"], dependencies: [{ kind: "directive", type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i4.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i4.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "directive", type: i4.NgSwitchDefault, selector: "[ngSwitchDefault]" }, { kind: "component", type: i6.MatIconButton, selector: "button[mat-icon-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "component", type: TopNavMenuComponent, selector: "mui-top-nav-menu", inputs: ["navItem"] }, { kind: "component", type: NotificationBellComponent, selector: "mui-notification-bell", inputs: ["navItem", "notificationCenter"] }, { kind: "component", type: SearchComponent, selector: "mui-search", inputs: ["navItem"] }, { kind: "component", type: ProfileMenuComponent, selector: "mui-profile-menu", inputs: ["navItem"] }, { kind: "pipe", type: i4.AsyncPipe, name: "async" }], animations: [
        trigger('fadeInOut', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('500ms', style({ opacity: 1 })),
            ]),
            transition(':leave', [
                animate('500ms', style({ opacity: 0 }))
            ])
        ])
    ], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiTopNavigationComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mui-top-navigation', exportAs: 'muiTopNavigation', changeDetection: ChangeDetectionStrategy.OnPush, animations: [
                        trigger('fadeInOut', [
                            transition(':enter', [
                                style({ opacity: 0 }),
                                animate('500ms', style({ opacity: 1 })),
                            ]),
                            transition(':leave', [
                                animate('500ms', style({ opacity: 0 }))
                            ])
                        ])
                    ], template: "<ng-container *ngIf=\"navData$ | async as navData; else ghosts\">\r\n  <mui-top-nav-menu\r\n      [navItem]=\"navData.mainNav[0]\"></mui-top-nav-menu>\r\n\r\n  <nav class=\"mui-main-nav-container\"\r\n      @fadeInOut>\r\n    <button\r\n        class=\"mui-main-nav-pagination\"\r\n        [class.mui-main-nav-pagination-disabled]=\"disableScrollBefore\"\r\n        [class.mui-main-nav-pagination-visible]=\"showPaginationControls\"\r\n        [disabled]=\"disableScrollBefore\"\r\n        mat-icon-button\r\n        aria-hidden=\"true\"\r\n        (click)=\"onPaginatorClicked('before')\"\r\n    >\r\n      <span class=\"mui-icons\">chevron_left</span>\r\n    </button>\r\n\r\n    <div #navItemsList\r\n        class=\"mui-main-nav-items-container\">\r\n      <ng-container *ngFor=\"let navItem of navData.mainNav; let i = index\">\r\n        <mui-top-nav-menu *ngIf=\"i > 0\"\r\n            [navItem]=\"navItem\"></mui-top-nav-menu>\r\n      </ng-container>\r\n    </div>\r\n\r\n    <button\r\n        class=\"mui-main-nav-pagination\"\r\n        [class.mui-main-nav-pagination-disabled]=\"disableScrollAfter\"\r\n        [class.mui-main-nav-pagination-visible]=\"showPaginationControls\"\r\n        [disabled]=\"disableScrollAfter\"\r\n        mat-icon-button\r\n        aria-hidden=\"true\"\r\n        (click)=\"onPaginatorClicked('after')\"\r\n    >\r\n      <span class=\"mui-icons\">chevron_right</span>\r\n    </button>\r\n  </nav>\r\n  <nav class=\"mui-aux-nav-container\"\r\n      @fadeInOut>\r\n    <ng-container *ngFor=\"let navItem of navData.auxNav\"\r\n        [ngSwitch]=\"navItem.id\"\r\n    >\r\n      <mui-notification-bell\r\n          *ngSwitchCase=\"'aux-notification'\"\r\n          [navItem]=\"navItem\"\r\n          [notificationCenter]=\"notificationCenter\"\r\n      ></mui-notification-bell>\r\n      <mui-search *ngSwitchCase=\"'aux-search'\"\r\n          [navItem]=\"navItem\"></mui-search>\r\n      <mui-profile-menu *ngSwitchCase=\"'aux-user'\"\r\n          [navItem]=\"navItem\"></mui-profile-menu>\r\n      <mui-top-nav-menu *ngSwitchDefault\r\n          [navItem]=\"navItem\"></mui-top-nav-menu>\r\n    </ng-container>\r\n  </nav>\r\n</ng-container>\r\n<ng-template #ghosts>\r\n  <div class=\"nav-ghosts-container\"\r\n      @fadeInOut>\r\n    <div class=\"menu-icon-ghost\">\r\n      <span class=\"mui-icons\">mapp_m</span>\r\n    </div>\r\n    <div *ngFor=\"let g of ghostList\"\r\n        class=\"menu-ghost\"\r\n    ></div>\r\n  </div>\r\n</ng-template>\r\n", styles: ["@keyframes ghost-lines{0%{background-position:0}to{background-position:80vw}}:host{display:flex;height:48px;width:100%}.mui-main-nav-container{display:flex;height:48px;flex-grow:1;flex-shrink:1;overflow:hidden}.mui-aux-nav-container{width:250px;height:48px;display:flex;justify-content:flex-end}.mui-main-nav-pagination{height:100%;width:24px;display:none;border-radius:0;padding:12px 0}.mui-main-nav-pagination-visible{display:initial}.mui-main-nav-items-container{display:flex;overflow:hidden;flex-grow:1;flex-shrink:1}.nav-ghosts-container{display:flex;align-items:center;position:fixed;width:calc(100% - 250px)}.menu-ghost{width:8.5%;height:20px;margin:0 2px;background-image:linear-gradient(90deg,#78859d 0px,#8696b2 40px,#78859d 80px);background-size:80vw;animation:ghost-lines 1.5s infinite linear}.menu-icon-ghost{width:48px;height:48px}.menu-icon-ghost span{color:#fff;display:inline-block;position:relative;top:8px;left:12px}\n"] }]
        }], ctorParameters: function () { return [{ type: TopNavigationService }, { type: i5$2.ViewportRuler }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { hostClassName: [{
                type: HostBinding,
                args: ['class']
            }], apiUrl: [{
                type: Input
            }], notificationCenter: [{
                type: Input
            }], disablePagination: [{
                type: Input
            }], disableCache: [{
                type: Input
            }], navItemsContainer: [{
                type: ViewChild,
                args: ['navItemsList', { static: false }]
            }] } });

class MuiTopNavigationModule {
}
MuiTopNavigationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiTopNavigationModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MuiTopNavigationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.10", ngImport: i0, type: MuiTopNavigationModule, declarations: [MuiTopNavigationComponent,
        TopNavMenuComponent,
        NotificationBellComponent,
        SearchComponent,
        ProfileMenuComponent,
        TopNavDialogComponent,
        TimeoutDialogComponent,
        EditProfileComponent,
        EditPasswordComponent,
        LangChangeDialogComponent], imports: [CommonModule,
        MatMenuModule,
        MatButtonModule,
        MatBadgeModule,
        MatInputModule,
        MatFormFieldModule,
        OverlayModule,
        MatSlideToggleModule,
        MatTabsModule,
        MatDialogModule,
        MatSelectModule,
        ReactiveFormsModule,
        A11yModule,
        MuiIconModule], exports: [MuiTopNavigationComponent] });
MuiTopNavigationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiTopNavigationModule, imports: [CommonModule,
        MatMenuModule,
        MatButtonModule,
        MatBadgeModule,
        MatInputModule,
        MatFormFieldModule,
        OverlayModule,
        MatSlideToggleModule,
        MatTabsModule,
        MatDialogModule,
        MatSelectModule,
        ReactiveFormsModule,
        A11yModule,
        MuiIconModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: MuiTopNavigationModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        MuiTopNavigationComponent,
                        TopNavMenuComponent,
                        NotificationBellComponent,
                        SearchComponent,
                        ProfileMenuComponent,
                        TopNavDialogComponent,
                        TimeoutDialogComponent,
                        EditProfileComponent,
                        EditPasswordComponent,
                        LangChangeDialogComponent
                    ],
                    imports: [
                        CommonModule,
                        MatMenuModule,
                        MatButtonModule,
                        MatBadgeModule,
                        MatInputModule,
                        MatFormFieldModule,
                        OverlayModule,
                        MatSlideToggleModule,
                        MatTabsModule,
                        MatDialogModule,
                        MatSelectModule,
                        ReactiveFormsModule,
                        A11yModule,
                        MuiIconModule
                    ],
                    exports: [
                        MuiTopNavigationComponent
                    ]
                }]
        }] });

class SessionTimerInterceptor {
    constructor(timerService) {
        this.timerService = timerService;
    }
    intercept(req, next) {
        if (this.timerService) {
            this.timerService.resetTimer();
        }
        return next.handle(req);
    }
}
SessionTimerInterceptor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: SessionTimerInterceptor, deps: [{ token: SessionTimerService }], target: i0.ɵɵFactoryTarget.Injectable });
SessionTimerInterceptor.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: SessionTimerInterceptor });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: SessionTimerInterceptor, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: SessionTimerService }]; } });

/*
 * Public API Surface of common
 */

/**
 * Generated bundle index. Do not edit.
 */

export { MuiAppHeaderActionsDirective, MuiAppHeaderComponent, MuiAppHeaderMenuDirective, MuiAppHeaderModule, MuiAppHeaderTitleDirective, MuiDrawerAddonsDirective, MuiDrawerComponent, MuiDrawerContentDirective, MuiDrawerControlsDirective, MuiDrawerModule, MuiDrawerTitleDirective, MuiHeadernavComponent, MuiIconComponent, MuiIconModule, MuiLeftnavComponent, MuiLeftnavContainerComponent, MuiLeftnavContentComponent, MuiNavigationModule, MuiPageHeaderActionsDirective, MuiPageHeaderComponent, MuiPageHeaderModule, MuiPageHeaderSubtitleDirective, MuiPageHeaderTitleDirective, MuiStepComponent, MuiStepperComponent, MuiStepperModule, MuiTopNavigationComponent, MuiTopNavigationModule, SessionTimerInterceptor, TopNavigationService };
//# sourceMappingURL=mapp-ui-common.mjs.map
