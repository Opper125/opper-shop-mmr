const Pusher = require('pusher');

const pusher = new Pusher({
    appId: '1957567',
    key: 'd4eecb78fd7af20b5829',
    secret: '2086b4ecdcbdf9a6b864',
    cluster: 'ap1',
    useTLS: true
});

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' })
        };
    }

    const { username, message, timestamp } = JSON.parse(event.body);

    try {
        await pusher.trigger('my-channel', 'my-event', { username, message, timestamp });
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Message sent successfully' })
        };
    } catch (error) {
        console.error('Error sending message:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error sending message' })
        };
    }
};
