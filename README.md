# How's My Track?
"How's My Track?" is a website built for musicians and music producers to solicit feedback on unfinished tracks. Users submit a request as a Soundcloud URL, and may optionally include information on what they'd like feedback on, or any other context. Once every 24 hours, these requests are assigned to 'groups' of 4. Once assigned to a group, users can listen to the other tracks in their group and leave feedback for their peers. Once a user has written feedback for everyone else in their group, they will be able to see their own feedback. Users can also rate the feedback they receive; users with a higher average rating will be grouped together, incentivising writing constructive, high quality feedback in order to be grouped with other users who write constructive, high quality feedback in future.

The API portion of "How's My Track?" can be found [here](https://github.com/ruairid/howsmytrack-api).

## Running

 1. `yarn install`
 2. `yarn run debug`

If you are also running a local API instance to debug against, update the URL in `apiRoot.js`.
