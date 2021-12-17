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
            <x-label class="flex items-center justify-center mt-4" for="portal" :value="__('Select portal')" />
            <div class="flex items-center justify-center mt-4" id="portal">
                <select name="portal" id="portal">
                    @foreach ($portals as $portal)
                    <option value="{{$portal->id}}">
                        {{$portal->name}}
                    </option>
                    @endforeach
                </select>
            </div>

            <div class="flex items-center justify-center mt-4">
                <x-button>
                    {{ __('Select') }}
                </x-button>
            </div>
        </form>
    </x-auth-card>
</x-guest-layout>