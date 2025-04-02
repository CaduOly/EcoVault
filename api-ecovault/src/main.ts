import HttpServerApplication from './v1/application/server/http-server-application';

(async (): Promise<void> => {
    await runApplication();
})();

async function runApplication(): Promise<void> {
    const serverApplication = HttpServerApplication.new();
    await serverApplication.run();
}
