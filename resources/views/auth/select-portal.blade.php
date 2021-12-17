<x-guest-layout>
    <x-auth-card>
        <x-slot name="logo">
            <a href="/">
                <x-application-logo class="w-20 h-20 fill-current text-gray-500" />
            </a>
        </x-slot>

        <!-- Session Status -->
        <x-auth-session-status class="mb-4" :status="session('status')" />

        <!-- Validation Errors -->
        <x-auth-validation-errors class="mb-4" :errors="$errors" />

        <form method="POST" action="{{ route('postSelectForm') }}">
            @csrf

            <!-- Select Portal -->
            <x-label class="flex items-center justify-center mt-4" for="portal" :value="__('Выберите портал')" />
            <div class="flex items-center max-w-full justify-center mt-4" id="portal">
                <select class="max-w-full min-w-1/2 mt-2" name="portal" id="portal">
                    @foreach ($portals as $portal)
                    <option class="max-w-1/2" value="{{$portal->id}}">
                        {{$portal->name}}
                    </option>
                    @endforeach
                </select>
            </div>

            <div class="flex items-center justify-center mt-6">
                <x-button>
                    {{ __('Выбрать') }}
                </x-button>
            </div>
        </form>
    </x-auth-card>
</x-guest-layout>