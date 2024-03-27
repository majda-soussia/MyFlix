<?php

namespace App\Filament\Resources;

use App\Models\User;
use Filament\{Tables, Forms};
//use Filament\Resources\{Form, Table, Resource};
use Livewire\Component;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\Card;
use Illuminate\Database\Eloquent\Model;
use Filament\Forms\Components\TextInput;
use App\Filament\Filters\DateRangeFilter;
use App\Filament\Resources\UserResource\Pages;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use filament\tables\table;
use Illuminate\Support\Facades\Hash;
class UserResource extends Resource
{
    protected static ?string $model = User::class;

    //protected static ?string $navigationIcon = 'heroicon-o-collection';
    protected static ?string $navigationIcon = 'heroicon-o-user-group';

    protected static ?string $recordTitleAttribute = 'name';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Card::make()->schema([
                Grid::make(['default' => 0])->schema([
                    TextInput::make('name')
                        ->rules(['max:255', 'string'])
                        ->required()
                        ->placeholder('Name')
                        ->columnSpan([
                            'default' => 12,
                            'md' => 12,
                            'lg' => 12,
                        ]),
                        

                    TextInput::make('email')
                        ->rules(['email'])
                        ->required()
                        ->unique(
                            'users',
                            'email',
                            fn(?Model $record) => $record
                        )
                        ->email()
                        ->placeholder('Email')
                        ->columnSpan([
                            'default' => 12,
                            'md' => 12,
                            'lg' => 12,
                        ]),

                    TextInput::make('password')
                        ->required()
                        ->password()
                       // ->dehydrateStateUsing(fn($state) => \Hash::make($state))
                        ->dehydrateStateUsing(fn (string $state): string => Hash::make($state))
                        ->required(
                            fn(Component $livewire) => $livewire instanceof
                                Pages\CreateUser
                        )
                        ->placeholder('Password')
                        ->columnSpan([
                            'default' => 12,
                            'md' => 12,
                            'lg' => 12,
                        ]),
                        Forms\Components\Select::make('roles')
    ->relationship('roles', 'name')
    ->multiple()
    ->preload()
    ->searchable()
                ]),
            ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->poll('60s')
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->toggleable()
                    ->searchable(true, null, true)
                    ->limit(50),
                Tables\Columns\TextColumn::make('email')
                    ->toggleable()
                    ->searchable(true, null, true)
                    ->limit(50),
            ])
            ->filters([DateRangeFilter::make('created_at')])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ]);
            
    }

    public static function getRelations(): array
    {
        return [
            UserResource\RelationManagers\RatingsRelationManager::class,
            UserResource\RelationManagers\BonPlansRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListUsers::route('/'),
            'create' => Pages\CreateUser::route('/create'),
            'view' => Pages\ViewUser::route('/{record}'),
            'edit' => Pages\EditUser::route('/{record}/edit'),
        ];
    }
}
