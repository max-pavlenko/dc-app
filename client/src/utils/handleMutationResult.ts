export const handleMutationResult = <T extends { error: any } | { data: any }>
(result: T, onSuccess: (data: T) => any, onError: (err: T) => any = () => {}) => {
    if ('error' in result) {
        onError(result.error)
        console.log('Error:', result.error);
    } else {
        onSuccess(result.data);
        console.log('Success sent:', result.data);
    }
};
