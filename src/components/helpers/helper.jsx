export const serializer = (formData, values) => {
    Object.entries(values).map((item) => {
        formData.append(item[0], item[1]);
    });
};