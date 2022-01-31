import { IsAuthenticated } from '../../../core/authentication/use_cases/queries/is_authenticated';
import { JwtTokenProviderStub, expectedToken } from '../../../providers/authentication/jwt_token_provider_stub';

describe('GIVEN i want to verify that user is authenticated', () => {
    let tokenProvider: JwtTokenProviderStub;
    let isAuthenticated: IsAuthenticated;

    beforeEach(() => {
        tokenProvider = new JwtTokenProviderStub();
        isAuthenticated = new IsAuthenticated(
            tokenProvider,
        );
    });

    describe('WHEN token is valid', () => {
        test('THEN user is authentified', async () => {
            expect(await isAuthenticated.execute({ token: expectedToken })).toEqual(true);
        });
    });

    describe('WHEN token is not valid', () => {
        test('THEN user is not authentified', async () => {
            expect(await isAuthenticated.execute({ token: 'invalid_token' })).toEqual(false);
        });
    });
});
