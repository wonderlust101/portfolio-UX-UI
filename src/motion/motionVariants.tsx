export const headerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.75,
            ease: "easeOut",
            delay: 0.15
        }
    }
};

export const contentVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.75,
            ease: "easeOut",
            delay: 0.3
        }
    }
};

export const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        delay: 0.5,
        opacity: 1,
        y: 0,
        transition: { duration: 0.75, ease: "easeOut" }
    }
};

export const fadeUpLowOpacity = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        delay: 0.5,
        opacity: 0.25,
        y: 0,
        transition: { duration: 0.75, ease: "easeOut" }
    }
};

export const staggerParent = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1
        }
    }
};

export const fadeUpWithDelay = {
    hidden: { opacity: 0, y: 50 },
    visible: (customDelay: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.75,
            ease: "easeOut",
            delay: customDelay
        }
    })
};