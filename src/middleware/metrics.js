const metrics = {
    totalRequests: 0,
    methods: {},
    errors: 0,
    totalResponseTime: 0,
};

export const metricsMiddleware = (req, res, next) => {
    const start = Date.now();

    metrics.totalRequests++;

    const method = req.method;
    metrics.methods[method] = (metrics.methods[method] || 0) + 1;

    res.on("finish", () => {
        const duration = Date.now() - start;
        metrics.totalResponseTime += duration;

        if (res.statusCode >= 400) {
            metrics.errors++;
        }
    });

    next();
};

export const getMetricsData = () => {
    return {
        totalRequests: metrics.totalRequests,
        requestsByMethod: metrics.methods,
        errorCount: metrics.errors,
        avgResponseTimeMs:
            metrics.totalRequests > 0
                ? Math.round(metrics.totalResponseTime / metrics.totalRequests)
                : 0,
        memoryUsageMB: Math.round(process.memoryUsage().rss / 1024 / 1024),
    };
};
