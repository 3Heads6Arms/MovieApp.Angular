document.addEventListener('DOMContentLoaded', () => {
    System.config({
        packages: {
            '/scripts/': {
                format: 'register',
                defaultExtension: 'js'
            }
        }
    });
});