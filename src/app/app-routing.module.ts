import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent} from './login/login.component';
import { GroupsComponent} from './groups/groups.component';
import { RoomsComponent} from './rooms/rooms.component';

const routes: Routes = [{path: 'chat', component: ChatComponent}, {path: '', component: LoginComponent}, {path: 'group', component: GroupsComponent}, {path: 'rooms', component: RoomsComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
