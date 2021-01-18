<script>
import runIntro from '../plugins/blocks';

export default {
    data() {
        return {
            showWebDevelopment: true,
            showProfileImage: false,
            initialised: false,
            isDragging: false,
            throwInProfile: null,
            profileTimer: null,
        };
    },
    watch: {
        $route() {
            this.checkForContactRoute();
        },
    },
    mounted() {
        this.runIntro();
    },
    methods: {
        runIntro() {
            const {throwInProfile} = runIntro({
                elements: {
                    joris: this.$refs.joris,
                    noordermeer: this.$refs.noordermeer,
                    webDevelopment: this.$refs.webDevelopment,
                    profile: this.$refs.profile,
                },
                callbacks: {
                    startdrag: this.startDrag,
                    enddrag: this.endDrag,
                    removeWebdev: this.removeWebdev,
                },
            });
            this.throwInProfile = throwInProfile;
            this.initialised = true;
            this.profileTimer = setTimeout(this.checkForContactRoute, 2000);
        },
        startDrag() {
            this.clearSelection();
            this.isDragging = true;
        },
        endDrag() {
            this.isDragging = false;
        },
        removeWebdev() {
            this.showWebDevelopment = false;
        },
        addProfileImage() {
            this.throwInProfile();
            this.showProfileImage = true;
        },
        clearSelection() {
            if (window.getSelection) {
                window.getSelection().removeAllRanges();
            } else if (document.selection) {
                document.selection.empty();
            }
        },
        checkForContactRoute() {
            if (this.getRouteBaseName() === 'contact') {
                this.profileTimer = setTimeout(this.addProfileImage, 2000);
            } else {
                clearTimeout(this.profileTimer);
            }
        },
    },
};
</script>

<template>
    <div>
        <span class="placeholder typo-large name-block">&nbsp;</span>
        <div
            class="absolute inset-0 overflow-hidden z-10 lg:fixed"
            :class="{'opacity-0': !initialised, 'pointer-events-none touch-action-none': !isDragging }"
        >
            <!--<div id="debug"></div>-->
            <span
                ref="joris"
                class="typo-large name-block"
            >Joris</span>
            <span
                ref="noordermeer"
                class="typo-large name-block"
            >Noordermeer</span>
            <span
                v-show="showWebDevelopment"
                ref="webDevelopment"
                class="typo-large name-block"
            >Web Development</span>
            <div
                ref="profile"
                class="typo-large name-block profile-image"
                :class="{ 'opacity-0': !showProfileImage }"
            />
        </div>
    </div>
</template>

<style lang="postcss" scoped>
.name-block {
    @apply select-none pointer-events-auto cursor-pointer;
}

.touch-action-none {
    touch-action: none;
}

.placeholder {
    @apply bg-transparent select-none;

    margin-bottom: 0.1em;
}

.profile-image {
    width: 1.1111em;
    height: 1.1111em;
    background: url("../assets/profile.jpg") no-repeat;
    background-size: cover;
}

@screen lg {
    .placeholder {
        @apply hidden;
    }
}
</style>
