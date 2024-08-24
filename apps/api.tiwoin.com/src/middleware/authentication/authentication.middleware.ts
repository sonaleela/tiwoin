import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CognitoJwtVerifier } from "aws-jwt-verify";
import { UserService } from 'src/service';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
    verifier;
    constructor(private userService: UserService, private configService: ConfigService) {
        this.verifier = CognitoJwtVerifier.create({
            userPoolId: (<string>this.configService.get('COGNITO_USER_POOL_ID')),
            tokenUse: "access",
            clientId: (<string>this.configService.get('COGNITO_CLIENT_ID')),
        });
    }

    async use(req: any, res: any, next: () => void) {
        const token = req.headers?.authorization ? req.headers.authorization.split(" ")[1] : '';
        let [header, payload, _] = token.split('.');
        header = Buffer.from(header, 'base64').toString('utf-8');
        if (!header || !payload) {
            throw new ForbiddenException("requested token is invalid");
        }

        try {
            const claim = await this.verifier.verify(token);
            if (!claim.sub) throw new Error("No user id provided");
            const user = await this.userService.find(claim.sub);

            req.user = {
                id: claim?.sub,
                clientId: claim?.client_id,
                isValid: true,
                ...user,
            };
        } catch (error) {
            throw new ForbiddenException(error);
        }

        next();
    }
}
