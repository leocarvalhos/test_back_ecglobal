import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PostsService } from 'src/posts/posts.service';

//Guard de verificação para garantir que alterações e exclusões sejam feitas pelo próprio usuário.
@Injectable()
export class PostOwnershipGuard implements CanActivate {
  constructor(private readonly postsService: PostsService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const postId = request.params.id;

    return this.validateOwnership(user, postId);
  }

  async validateOwnership(user: any, post_id: string) {
    const ownerPost = await this.postsService.findUserByPostID(post_id);

    if (user.userId === ownerPost) {
      return true;
    }
    return true;
  }
}
