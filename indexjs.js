// មុខងារផ្ញើសារសេចក្តីលម្អិតការកម្មង់ទៅកាន់ Telegram Bot និងបញ្ជូនទៅទំព័រថ្មី
    orderForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        // ជំនួស Telegram Bot Token និង Chat ID របស់អ្នកនៅទីនេះ
        const BOT_TOKEN = "YOUR_TELEGRAM_BOT_TOKEN";
        const CHAT_ID = "YOUR_CHAT_ID";

        // ទាញយកតម្លៃពី Form
        const fullName = document.getElementById("fullName").value;
        const gender = document.getElementById("gender").value;
        const phone = document.getElementById("phone").value;
        const email = document.getElementById("email").value;
        const address = document.getElementById("address").value;
        const foodItem = foodSelect.value;
        const note = document.getElementById("note").value || "គ្មាន";

        // រៀបចំសារសម្រាប់ផ្ញើទៅ Telegram
        const message = `🛍️ *ការបញ្ជាទិញថ្មី (KimFood)*\n\n` +
                        `👤 *ឈ្មោះ:* ${fullName} (${gender})\n` +
                        `📞 *ទូរស័ព្ទ:* ${phone}\n` +
                        `📧 *អ៊ីមែល:* ${email}\n` +
                        `📍 *អាសយដ្ឋាន:* ${address}\n` +
                        `🍲 *មុខម្ហូប:* ${foodItem}\n` +
                        `📝 *ចំណាំ:* ${note}`;

        const submitBtn = document.getElementById("submitBtn");
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> កំពុងបញ្ជូន...`;

        try {
            const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: message,
                    parse_mode: "Markdown"
                })
            });

            if (response.ok) {
                // បិទ Modal
                modal.style.display = "none";
                orderForm.reset();
                
                // បញ្ជូនទៅកាន់ទំព័រថ្មី (សូមបង្កើត file ឈ្មោះ success.html ឬដាក់ Link វេបសាយដែលអ្នកចង់ឱ្យទៅ)
                window.location.href = "success.html";
            } else {
                alert("មានបញ្ហាក្នុងការបញ្ជូន សូមព្យាយាមម្តងទៀត។");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("មានបញ្ហាបណ្តាញអ៊ិនធឺណិត សូមពិនិត្យការតភ្ជាប់របស់អ្នក។");
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = `<i class="fa-solid fa-paper-plane"></i> បញ្ជូនការកម្មង់ទៅភ្នាក់ងារ`;
        }
    });
</script>s