import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
import { Observable } from "rxjs";

@Injectable()
export class AdminPathGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const path = request.url;

    if (path.toLowerCase().startsWith('/admin/')) {
      return super.canActivate(context);
    }

    return true;
  }
}
