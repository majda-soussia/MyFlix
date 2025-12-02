import type { NavigatorScreenParams } from '@react-navigation/native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs'

export type RootStackParamList = {
    Welcome: undefined
    Login: undefined
    Register: undefined
    ForgotPassword: undefined
    ResetPassword: { id: string }
    EmailVerification: { email: string }
    EmailVerified: undefined
    Main: NavigatorScreenParams<MainTabParamList>
    MovieDetails: { id: string }
    SearchResults: { query: string }
    AccountSettings: undefined
}

export type MainTabParamList = {
    Home: undefined
    Trending: undefined
    Favorites: undefined
    Profile: undefined
}

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
    RootStackParamList,
    T
>

export type MainTabScreenProps<T extends keyof MainTabParamList> = BottomTabScreenProps<
    MainTabParamList,
    T
>

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}
