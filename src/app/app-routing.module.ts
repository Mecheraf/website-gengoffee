import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EventsComponent } from './events/events.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { RegisterComponent } from './register/register.component';
import { CreateeventComponent } from './createevent/createevent.component';
import { ContactComponent } from './contact/contact.component';
import { RegisteredComponent } from './registered/registered.component';
import { LoginAdminComponent } from './loginAdmin/loginAdmin.component';
import { AuthGuard } from './auth/auth.guard';
import { JobboardComponent } from './jobboard/jobboard.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'events', component: EventsComponent},
  { path: 'about', component: AboutUsComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'createevent', component: CreateeventComponent, canActivate:[AuthGuard]},
  { path: 'contact', component: ContactComponent},
  { path: 'registered', component: RegisteredComponent, canActivate:[AuthGuard]},
  { path: 'loginadmin', component: LoginAdminComponent},
  { path: 'jobs', component: JobboardComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
