export const passwordMatchValidator = (formGroup) => {
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmPassword');
    if (!password || !confirmPassword) {
        return null;
    }
    if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
    }
    confirmPassword.setErrors(null);
    return null;
};
