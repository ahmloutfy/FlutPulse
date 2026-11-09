window.FlutPulseAnalytics = {

    event(name, params = {}, options = {}) {
        if (typeof window.gtag !== "function") {
            return;
        }

        window.gtag("event", name, { ...params, ...options });
    },

    articleView(title) {
        this.event("article_view", { article_title: title });
    },

    articleComplete(title) {
        this.event("article_complete", { article_title: title });
    },

    ctaClick(label, location) {
        this.event("cta_click", {
            cta_label: label,
            cta_location: location
        });
    },

    outboundClick(destination, location) {
        this.event("outbound_click", {
            destination,
            link_location: location,
            transport_type: "beacon"
        });
    },

    articleRating(title, rating) {
        this.event("article_rating", {
            article_title: title,
            rating
        });
    },

    articleShare(title, method) {
        this.event("article_share", {
            article_title: title,
            share_method: method
        });
    }
};

document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll("[data-track-cta]").forEach((link) => {
        link.addEventListener("click", () => {
            FlutPulseAnalytics.ctaClick(
                link.getAttribute("data-track-cta"),
                link.getAttribute("data-track-location") || "unknown"
            );
        });
    });

    const engagement = document.querySelector("[data-article-engagement]");
    if (engagement && window.articleTitle) {
        const status = engagement.querySelector("[data-engagement-status]");
        const articleUrl = window.location.href.split("#")[0];
        const ratingKey = `flutpulse-rating:${articleUrl}`;
        const ratingButtons = engagement.querySelectorAll("[data-article-rating]");
        let savedRating = null;

        try {
            savedRating = window.localStorage.getItem(ratingKey);
        } catch (_) {
            // Ratings still work for this page when storage is unavailable.
        }

        if (savedRating) {
            ratingButtons.forEach((button) => { button.disabled = true; });
            status.textContent = "Thanks for your feedback!";
        }

        ratingButtons.forEach((button) => {
            button.addEventListener("click", () => {
                if (savedRating) return;

                const rating = button.getAttribute("data-article-rating");
                FlutPulseAnalytics.articleRating(window.articleTitle, rating);
                savedRating = rating;
                try {
                    window.localStorage.setItem(ratingKey, rating);
                } catch (_) {
                    // The response is still submitted to analytics for this visit.
                }
                ratingButtons.forEach((ratingButton) => { ratingButton.disabled = true; });
                status.textContent = "Thanks for your feedback!";
            });
        });

        const shareButton = engagement.querySelector("[data-share-article]");
        shareButton.addEventListener("click", async () => {
            if (typeof navigator.share !== "function") {
                try {
                    await navigator.clipboard.writeText(articleUrl);
                    FlutPulseAnalytics.articleShare(window.articleTitle, "copy_fallback");
                    status.textContent = "Article link copied. Share it with a friend!";
                } catch (_) {
                    status.textContent = "Sharing is not available in this browser.";
                }
                return;
            }

            try {
                await navigator.share({ title: window.articleTitle, url: articleUrl });
                FlutPulseAnalytics.articleShare(window.articleTitle, "native_share");
                status.textContent = "Thanks for sharing this article!";
            } catch (error) {
                if (!error || error.name !== "AbortError") {
                    status.textContent = "Unable to share this article right now.";
                }
            }
        });

        const copyButton = engagement.querySelector("[data-copy-article-link]");
        copyButton.addEventListener("click", async () => {
            try {
                await navigator.clipboard.writeText(articleUrl);
                FlutPulseAnalytics.articleShare(window.articleTitle, "copy_link");
                status.textContent = "Article link copied. Share it with a friend!";
            } catch (_) {
                status.textContent = "Could not copy the link. You can copy it from the address bar.";
            }
        });
    }

    const currentHost = window.location.hostname;
    document.querySelectorAll("a[href^='http']").forEach((link) => {
        let linkHost = "";

        try {
            linkHost = new URL(link.href).hostname;
        } catch (_) {
            return;
        }

        if (linkHost && linkHost !== currentHost) {
            link.addEventListener("click", () => {
                FlutPulseAnalytics.outboundClick(
                    link.href,
                    link.getAttribute("data-track-location") || "unknown"
                );
            });
        }
    });

    if (!window.articleTitle)
        return;

    const fireArticleView = (attempt = 0) => {
        if (typeof window.gtag === "function") {
            FlutPulseAnalytics.articleView(window.articleTitle);
            return;
        }

        if (attempt < 5) {
            setTimeout(() => fireArticleView(attempt + 1), 500);
        }
    };

    fireArticleView();

    let completed = false;

    window.addEventListener("scroll", () => {

        if (completed)
            return;

        const scrollPosition =
            window.scrollY + window.innerHeight;

        const documentHeight =
            document.documentElement.scrollHeight;

        const progress =
            scrollPosition / documentHeight;

        if (progress >= 0.9) {

            completed = true;

            FlutPulseAnalytics.articleComplete(window.articleTitle);

        }

    });

});
