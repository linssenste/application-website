import { Meta, StoryFn } from '@storybook/vue3';
import AudioVisualizer from '../../../components/music/AudioVisualizer.vue';

export default {
	title: 'Components/Audio/AudioVisualizer',
	component: AudioVisualizer,
	tags: ['autodocs'],
} as Meta<typeof AudioVisualizer>;

const Template: StoryFn<typeof AudioVisualizer> = (args) => ({
	components: { AudioVisualizer },
	setup() {
		return { args };
	},
	template: '<AudioVisualizer />',
});

export const Default = Template.bind({});

