import { Meta, StoryFn } from '@storybook/vue3';
import MusicPlayer from '../../../components/music/MusicPlayer.vue';

export default {
	title: 'Components/Audio/MusicPlayer',
	component: MusicPlayer,
	argTypes: {
		trackId: {
			control: 'text',
			description: 'Spotify track ID to play',
		},
		mini: {
			control: 'boolean',
			description: 'Whether to use the mini player',
		},
	},
} as Meta<typeof MusicPlayer>;

const Template: StoryFn<typeof MusicPlayer> = (args) => ({
	components: { MusicPlayer },
	setup() {
		return { args };
	},
	template: '<MusicPlayer v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
	trackId: '6X7R1KlDSwHK7wYwy94sYQ', // Replace with a default Spotify track ID
};

export const MiniPlayer = Template.bind({});
MiniPlayer.args = {
	trackId: '6X7R1KlDSwHK7wYwy94sYQ', // Replace with the same or different Spotify track ID for demonstration
	mini: true,
};

export const LargePlayer = Template.bind({});
MiniPlayer.args = {
	trackId: '6X7R1KlDSwHK7wYwy94sYQ', // Replace with the same or different Spotify track ID for demonstration
	mini: false,
};

// Add more stories to showcase different states or behaviors of the component if needed
