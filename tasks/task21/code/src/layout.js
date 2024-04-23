    export const tmplLayout = `<div class="flex h-screen antialiased text-gray-800">
        <div class="flex flex-row h-full w-full overflow-x-hidden">

            <div class="flex flex-col flex-auto h-full p-6">
                <div class="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
                    <div class="flex flex-col h-full overflow-x-auto mb-4">
                        <div class="flex flex-col h-full">
                            <div data-id="chat" class="grid grid-cols-12 gap-y-2">{{>chat}}</div>
                        </div>
                    </div>
                    {{>button }}
                </div>
            </div>
        </div>
    </div>`