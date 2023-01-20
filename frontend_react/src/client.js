import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// where we're connecting to the sanity Client
export const client = sanityClient({
    projectId: '58omn54q',
    dataset: 'production',
    apiVersion: '2023-01-20',
    useCdn: true,
    token: 'skhlf9V7ojYTYQDYOTES1gzonJLkDR5cIS7x4fHPUJMpfrhQzaTlwLe8e8mHvgAczIGQ1lCppv5S8xCjS1K1ODDHwXEfa7r46XaJsRbZfbndKG1LKveJY0DQokkelb9ldNj8fSvxpEuFjSHfAJOfwtXbUi9jvmZ4Kk1m9fEZRS5dYhhmaGxI',
});

// useful for images
const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
