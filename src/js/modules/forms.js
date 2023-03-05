import checkNumInputs from "./checkNumInputs";
const forms = (state) => {
    const form = document.querySelectorAll('.form'),
        input = document.querySelectorAll('input');

    checkNumInputs('input[name="user_phone"]');

    const message = {
        loading: 'Загрузка...',
        succes: 'Спасибо! Мы скоро с Вами свяжемся',
        failure: 'Произошла ошибка'
    };

    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;
        let res = await fetch(url, {
            method: "POST",
            body: data
        });

        return await res.text();
    };

    const clearInput = () => {
        input.forEach(item => {
            item.value =  '';
        });
    };

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMesssage = document.createElement('div');
            statusMesssage.classList.add('status');
            item.appendChild(statusMesssage);

            const formData = new FormData(item);

            if (item.getAttribute('data-calc') === "end"){
                for (let key in state) {
                    formData.append(key, state[key]);
                }
            }

            postData('assets/server.php', formData)
                .then(res => {
                    statusMesssage.textContent = message.succes;
                })
                .catch(() => statusMesssage.textContent = message.failure)
                .finally(() => {
                    clearInput();
                    setTimeout(() => {
                        statusMesssage.remove();
                    }, 5000);
                });


        });
    });
};

export default forms;