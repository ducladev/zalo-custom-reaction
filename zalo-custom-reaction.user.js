// ==UserScript==
// @name         Zalo Custom Reaction
// @description  A userscript that lets you create custom reactions on Zalo Web.
// @supportURL   https://github.com/ducladev/zalo-custom-reaction/issues
// @version      1.4.1
// @author       Anh Duc Le (https://github.com/ducladev)
// @match        https://*.zalo.me/*
// @match        https://chat.zalo.me/*
// @grant        GM_xmlhttpRequest
// @connect      cdn.jsdelivr.net
// @license      MIT; https://opensource.org/licenses/MIT
// @icon         https://cdn.jsdelivr.net/gh/ducladev/zalo-custom-reaction/icon.svg
// @run-at       document-idle
// @homepage     https://github.com/ducladev/zalo-custom-reaction
// @downloadURL  https://cdn.jsdelivr.net/gh/ducladev/zalo-custom-reaction/zalo-custom-reaction.user.js
// @updateURL    https://cdn.jsdelivr.net/gh/ducladev/zalo-custom-reaction/zalo-custom-reaction.meta.js
// ==/UserScript==

(function () {
	"use strict";

	const customReactions = [
		{
			type: 100,
			icon: "👏",
			title: "Vỗ tay",
		},
		{
			type: 101,
			icon: "🎉",
			title: "Chúc mừng",
		},
		{
			type: 102,
			icon: "🎨",
			name: "customize",
			title: "Tùy chỉnh",
		},
	];

	let hasRecentlyReaction = false;

	/**
	 * Recently used reaction manager
	 * @author Anh Duc Le
	 */
	const recentlyReaction = {
		add(reaction) {
			const emojiCustom = {
				type: generateReactionHash(reaction),
				icon: reaction,
				title: "Gần đây",
			};

			if (hasRecentlyReaction) {
				customReactions[customReactions.length - 1] = emojiCustom;
			} else {
				customReactions.push(emojiCustom);
				hasRecentlyReaction = true;
			}

			try {
				localStorage.setItem(
					"zalo_recent_reaction",
					JSON.stringify(emojiCustom)
				);
			} catch (e) {
				console.warn("Cannot save to localStorage:", e);
			}

			this.updateUI();
		},

		get() {
			try {
				const reaction = localStorage.getItem("zalo_recent_reaction");
				return reaction ? JSON.parse(reaction) : null;
			} catch (e) {
				console.warn("Cannot read from localStorage:", e);
				return null;
			}
		},

		load() {
			const reaction = this.get();
			if (reaction) {
				hasRecentlyReaction = true;
				customReactions.push(reaction);
			}
		},

		updateUI() {
			document
				.querySelectorAll(".reaction-emoji-list")
				.forEach((list) => {
					list.removeAttribute("data-extended");
				});

			handleReactionList();
		},
	};

	let emojiCategories = {};

	const cachedEmojiCategories = new Map();

	/**
	 * Fetches and parses emoji data from emoji-data-by-group.json using GM_xmlhttpRequest
	 * @author Anh Duc Le
	 */
	const loadEmojiData = async () => {
		return new Promise((resolve, reject) => {
			GM_xmlhttpRequest({
				method: "GET",
				url: "https://cdn.jsdelivr.net/gh/ducladev/zalo-custom-reaction/emoji-data-by-group.json",
				onload: function (response) {
					try {
						const data = JSON.parse(response.responseText);

						// Parse data theo cấu trúc: array of {name, slug, emojis: []}
						const grouped = {};

						data.forEach((category) => {
							const categoryName = category.name;
							grouped[categoryName] = category.emojis.map(
								(item) => item.emoji
							);
						});

						emojiCategories = grouped;
						console.log(
							"✅ Emoji data loaded successfully:",
							Object.keys(emojiCategories).length,
							"categories"
						);
						resolve();
					} catch (error) {
						console.error("❌ Failed to parse emoji data:", error);
						loadFallbackEmojis();
						resolve();
					}
				},
				onerror: function (error) {
					console.error("❌ Failed to fetch emoji data:", error);
					loadFallbackEmojis();
					resolve();
				},
			});
		});
	};

	/**
	 * Loads fallback emojis when fetch fails
	 * @author Anh Duc Le
	 */
	const loadFallbackEmojis = () => {
		emojiCategories = {
			"Smileys & Emotion": [
				"😀",
				"😃",
				"😄",
				"😁",
				"😆",
				"😅",
				"🤣",
				"😂",
				"🙂",
				"🙃",
				"😉",
				"😊",
				"😇",
				"🥰",
				"😍",
				"🤩",
				"😘",
				"😗",
				"☺️",
				"😚",
			],
			"People & Body": [
				"👋",
				"🤚",
				"🖐️",
				"✋",
				"🖖",
				"👌",
				"🤌",
				"🤏",
				"✌️",
				"🤞",
				"🤟",
				"🤘",
				"🤙",
				"👈",
				"👉",
				"👆",
				"🖕",
				"👇",
				"☝️",
				"👍",
			],
			"Animals & Nature": [
				"🐶",
				"🐱",
				"🐭",
				"🐹",
				"🐰",
				"🦊",
				"🐻",
				"🐼",
				"🐨",
				"🐯",
				"🦁",
				"🐮",
				"🐷",
				"🐽",
				"🐸",
				"🐵",
				"🙈",
				"🙉",
				"🙊",
				"🐒",
			],
			"Food & Drink": [
				"🍏",
				"🍎",
				"🍐",
				"🍊",
				"🍋",
				"🍌",
				"🍉",
				"🍇",
				"🍓",
				"🫐",
				"🍈",
				"🍒",
				"🍑",
				"🥭",
				"🍍",
				"🥥",
				"🥝",
				"🍅",
				"🍆",
				"🥑",
			],
			"Travel & Places": [
				"🚗",
				"🚕",
				"🚙",
				"🚌",
				"🚎",
				"🏎️",
				"🚓",
				"🚑",
				"🚒",
				"🚐",
				"🛻",
				"🚚",
				"🚛",
				"🚜",
				"🛵",
				"🏍️",
				"🚲",
				"🛴",
				"🚁",
				"✈️",
			],
			Activities: [
				"⚽",
				"🏀",
				"🏈",
				"⚾",
				"🥎",
				"🎾",
				"🏐",
				"🏉",
				"🥏",
				"🎱",
				"🏓",
				"🏸",
				"🏒",
				"🏑",
				"🥍",
				"🏏",
				"🥅",
				"⛳",
				"🏹",
				"🎣",
			],
			Objects: [
				"⌚",
				"📱",
				"📲",
				"💻",
				"⌨️",
				"🖥️",
				"🖨️",
				"🖱️",
				"🖲️",
				"🕹️",
				"💾",
				"💿",
				"📀",
				"📼",
				"📷",
				"📸",
				"📹",
				"🎥",
				"📽️",
				"📞",
			],
			Symbols: [
				"❤️",
				"🧡",
				"💛",
				"💚",
				"💙",
				"💜",
				"🖤",
				"🤍",
				"🤎",
				"💔",
				"❣️",
				"💕",
				"💞",
				"💓",
				"💗",
				"💖",
				"💘",
				"💝",
				"💟",
				"☮️",
			],
			Flags: ["🏳️", "🏴", "🏁", "🚩", "🏳️‍🌈", "🏳️‍⚧️", "🏴‍☠️", "🇻🇳", "🇺🇸", "🇬🇧"],
		};
		console.log("⚠️ Using fallback emoji data");
	};

	/**
	 * Creates an emoji picker component.
	 * @author Anh Duc Le
	 */
	const createEmojiPicker = () => {
		const picker = document.createElement("div");
		picker.className = "emoji-picker";

		const tabsContainer = document.createElement("div");
		tabsContainer.className = "emoji-tabs-container";

		tabsContainer.addEventListener("mousewheel", function (e) {
			this.scrollLeft += e.deltaY;
			e.preventDefault();
		});

		const emojiContent = document.createElement("div");
		emojiContent.className = "emoji-content";

		const categoryIcons = {
			"Smileys & Emotion": "😀",
			"People & Body": "👨",
			"Animals & Nature": "🐱",
			"Food & Drink": "🍔",
			"Travel & Places": "🚗",
			Activities: "⚽",
			Objects: "📱",
			Symbols: "❤️",
			Flags: "🏳️",
		};

		Object.keys(emojiCategories).forEach((category, idx) => {
			const tab = document.createElement("button");
			tab.className = "emoji-category-tab";
			if (idx === 0) tab.classList.add("active");
			tab.dataset.category = category;
			tab.textContent = categoryIcons[category] || "📂";
			tab.title = category;

			tab.addEventListener("click", () => {
				document
					.querySelectorAll(".emoji-category-tab")
					.forEach((t) => {
						t.classList.remove("active");
					});
				tab.classList.add("active");

				if (!cachedEmojiCategories.has(category)) {
					const fragment = document.createDocumentFragment();
					emojiCategories[category].forEach((emoji) => {
						const emojiButton = document.createElement("button");
						emojiButton.className = "emoji-button";
						emojiButton.textContent = emoji;
						fragment.appendChild(emojiButton);
					});
					cachedEmojiCategories.set(
						category,
						fragment.cloneNode(true)
					);
				}

				emojiContent.innerHTML = "";
				emojiContent.appendChild(
					cachedEmojiCategories.get(category).cloneNode(true)
				);
			});

			tabsContainer.appendChild(tab);
		});

		picker.appendChild(tabsContainer);
		picker.appendChild(emojiContent);

		setTimeout(() => {
			const firstTab = picker.querySelector(".emoji-category-tab");
			if (firstTab) firstTab.click();
		}, 0);

		const closePickerHandler = (e) => {
			if (
				picker.style.display === "flex" &&
				!picker.contains(e.target) &&
				!e.target.classList.contains("emoji-button")
			) {
				picker.style.display = "none";
			}
		};
		document.addEventListener("click", closePickerHandler);

		picker.style.display = "none";
		picker._cleanup = () =>
			document.removeEventListener("click", closePickerHandler);
		return picker;
	};

	/**
	 * Creates the text input popup for custom reactions.
	 * @author Anh Duc Le
	 */
	const createTextInputPopup = () => {
		const popup = document.createElement("div");
		popup.className = "custom-reaction-popup";

		const title = document.createElement("div");
		title.className = "popup-title";
		title.textContent = "Tùy chỉnh reaction";

		const inputContainer = document.createElement("div");
		inputContainer.className = "popup-input-container";

		const input = document.createElement("input");
		input.className = "popup-input";
		input.type = "text";
		input.placeholder = "Nhập nội dung...";
		input.maxLength = 15;

		const emojiButton = document.createElement("button");
		emojiButton.className = "popup-emoji-button";
		emojiButton.textContent = "😊";

		const emojiPicker = createEmojiPicker();

		emojiButton.addEventListener("click", (e) => {
			e.preventDefault();
			e.stopPropagation();
			const isVisible = emojiPicker.style.display === "flex";
			emojiPicker.style.display = isVisible ? "none" : "flex";
		});

		const previewContainer = document.createElement("div");
		previewContainer.className = "popup-preview-container";

		const previewLabel = document.createElement("div");
		previewLabel.className = "popup-preview-label";
		previewLabel.textContent = "Xem trước:";

		const previewText = document.createElement("div");
		previewText.className = "popup-preview-text";

		previewContainer.appendChild(previewLabel);
		previewContainer.appendChild(previewText);

		const updatePreview = () => {
			previewText.textContent = input.value;
		};

		input.addEventListener("input", updatePreview);

		emojiPicker.addEventListener("click", (e) => {
			if (e.target.classList.contains("emoji-button")) {
				input.value += e.target.textContent;
				charCounter.textContent = `${input.value.length}/15`;
				updatePreview();
				emojiPicker.style.display = "none";
				input.focus();
			}
		});

		const charCounter = document.createElement("div");
		charCounter.className = "popup-char-counter";
		charCounter.textContent = "0/15";

		input.addEventListener("input", () => {
			charCounter.textContent = `${input.value.length}/15`;
		});

		inputContainer.appendChild(input);
		inputContainer.appendChild(emojiButton);
		inputContainer.appendChild(charCounter);
		inputContainer.appendChild(emojiPicker);

		const countContainer = document.createElement("div");
		countContainer.className = "popup-count-container";

		const countLabel = document.createElement("label");
		countLabel.className = "popup-count-label";
		countLabel.textContent = "Số lần gửi:";
		countLabel.htmlFor = "reaction-count-input";

		const countInput = document.createElement("input");
		countInput.className = "popup-count-input";
		countInput.type = "number";
		countInput.id = "reaction-count-input";
		countInput.min = "1";
		countInput.max = "1000";
		countInput.value = "1";
		countInput.placeholder = "1-1000";

		const countHint = document.createElement("div");
		countHint.className = "popup-count-hint";
		countHint.textContent = "Tối đa 1000 lần";
		countContainer.appendChild(countLabel);
		countContainer.appendChild(countInput);
		countContainer.appendChild(countHint);

		const buttonContainer = document.createElement("div");
		buttonContainer.className = "popup-button-container";

		const cancelButton = document.createElement("button");
		cancelButton.className = "popup-button popup-button-cancel";
		cancelButton.textContent = "Hủy";
		cancelButton.onclick = () => hidePopup();

		const confirmButton = document.createElement("button");
		confirmButton.className = "popup-button popup-button-confirm";
		confirmButton.textContent = "Gửi";

		const setLoading = (isLoading) => {
			confirmButton.disabled = isLoading;
			cancelButton.disabled = isLoading;
			countInput.disabled = isLoading;
			input.disabled = isLoading;

			if (isLoading) {
				confirmButton.textContent = "Đang gửi...";
				confirmButton.classList.add("loading");
			} else {
				confirmButton.textContent = "Gửi";
				confirmButton.classList.remove("loading");
			}
		};

		input.addEventListener("keydown", (e) => {
			if (e.key === "Enter") {
				confirmButton.click();
			}
		});

		buttonContainer.appendChild(cancelButton);
		buttonContainer.appendChild(confirmButton);

		popup.appendChild(title);
		popup.appendChild(inputContainer);
		popup.appendChild(previewContainer);
		popup.appendChild(countContainer);
		popup.appendChild(buttonContainer);

		const overlay = document.createElement("div");
		overlay.className = "custom-reaction-overlay";
		overlay.addEventListener("click", (e) => {
			if (e.target === overlay) {
				hidePopup();
			}
		});

		const hidePopup = () => {
			popup.style.display = "none";
			overlay.style.display = "none";
			emojiPicker.style.display = "none";
		};

		document.body.appendChild(popup);
		document.body.appendChild(overlay);

		return {
			popup,
			input,
			countInput,
			confirmButton,
			show: () => {
				popup.style.display = "flex";
				overlay.style.display = "block";
				input.value = "";
				countInput.value = "1";
				charCounter.textContent = "0/15";
				previewText.textContent = "";
				input.focus();
			},
			hide: hidePopup,
			setLoading,
			overlay,
		};
	};

	/**
	 * Injects CSS styles for custom reactions, emoji picker, and popup
	 * @author Anh Duc Le
	 */
	const injectCustomStyles = () => {
		const style = document.createElement("style");
		style.textContent = `
			/* Custom Reaction Popup Styles */
			.custom-reaction-popup {
				position: fixed;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				background: var(--layer-background);
				border: 1px solid var(--border);
				border-radius: 4px;
				padding: 12px;
				z-index: 9999;
				display: none;
				flex-direction: column;
				gap: 15px;
				min-width: 320px;
				animation: fadeIn 0.2s ease-out;
			}

			.custom-reaction-overlay {
				position: fixed;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				background: var(--curtain);
				z-index: 9998;
				display: none;
				animation: fadeIn 0.2s ease-out;
			}

			.popup-title {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				font-size: 1rem;
				font-weight: 500;
				line-height: 1.5;
				display: block;
			}

			.popup-input-container {
				position: relative;
			}

			.popup-input {
				border: 1px solid var(--border-subtle);
				padding: 0 10px 0 12px;
				color: var(--text-primary);
				background-color: var(--input-field-bg-outline);
				height: 40px;
				box-sizing: border-box;
				border-radius: 4px;
				transition: all .3s;
				font-size: .875rem;
				font-weight: 400;
				line-height: 1.5;
				width: 100%;
			}

			.popup-input:focus {
				border-color: var(--input-field-bg-outline-pressed);
			}

			.popup-emoji-button {
				position: absolute;
				right: 10px;
				top: 50%;
				transform: translateY(-50%);
				background: none;
				border: none;
				font-size: 18px;
				cursor: pointer;
				padding: 0;
				opacity: 0.7;
				transition: opacity 0.2s, transform 0.2s;
			}

			.popup-emoji-button:hover {
				opacity: 1;
				transform: translateY(-50%) scale(1.1);
			}

			.popup-char-counter {
				position: absolute;
				right: 0px;
    			font-size: .75rem;
				color: var(--text-secondary);
				margin-top: 5px;
			}

			.popup-preview-container {
				display: flex;
				flex-direction: column;
				gap: 8px;
				margin-top: 10px;
			}

			.popup-preview-label {
				font-size: .875rem;
				font-weight: 400;
				line-height: 1.5;
				color: var(--text-primary);
			}

			.popup-preview-text {
				padding: 6px 10px;
				background: var(--button-secondary-neutral-normal);
				border-radius: 4px;
				font-size: .875rem;
				display: inline-block;
				max-width: fit-content;
				min-height: 20px;
			}

			.popup-count-container {
				display: flex;
				flex-direction: column;
				gap: 8px;
			}

			.popup-count-label {
				font-size: .875rem;
				font-weight: 500;
				line-height: 1.5;
				color: var(--text-primary);
			}

			.popup-count-input {
				border: 1px solid var(--border-subtle);
				padding: 0 12px;
				color: var(--text-primary);
				background-color: var(--input-field-bg-outline);
				height: 40px;
				box-sizing: border-box;
				border-radius: 4px;
				transition: all .3s;
				font-size: .875rem;
				font-weight: 400;
				line-height: 1.5;
				width: 100%;
			}

			.popup-count-input:focus {
				border-color: var(--input-field-bg-outline-pressed);
				outline: none;
			}

			.popup-count-input:disabled {
				opacity: 0.5;
				cursor: not-allowed;
			}

			.popup-count-hint {
				font-size: .75rem;
				color: var(--text-secondary);
				font-style: italic;
			}

			.popup-button-container {
				display: flex;
				justify-content: flex-end;
				gap: 12px;
			}

			.popup-button {
				box-sizing: border-box;
				border: none;
				border-radius: 3px;
				cursor: pointer;
				padding: 0 16px;
				font-size: 1rem;
				width: fit-content;
				min-width: max-content;
				height: 40px;
				line-height: 1.5;
				font-weight: var(--medium);
				transition: background-color 0.2s;
			}
			
			.popup-button:disabled {
				opacity: 0.6;
				cursor: not-allowed;
			}

			.popup-button.loading {
				position: relative;
				padding: 0 16px 0 40px;
			}

			.popup-button.loading::after {
				content: '';
				position: absolute;
				left: 16px;
				top: 50%;
				transform: translateY(-50%);
				width: 14px;
				height: 14px;
				border: 2px solid transparent;
				border-top-color: currentColor;
				border-radius: 50%;
				animation: spin 0.6s linear infinite;
			}

			.popup-button-cancel {
				background-color: var(--button-secondary-neutral-normal);;
				color: var(--button-secondary-neutral-text);
			}

			.popup-button-cancel:hover {
				background-color: var(--button-secondary-neutral-hover);
			}

			.popup-button-confirm {
				background-color: var(--button-primary-normal);
				color: var(--button-primary-text);
			}

			.popup-button-confirm:hover {
				background-color: var(--button-primary-hover);
			}

			/* Emoji Picker Styles */
			.emoji-picker {
				display: flex;
				flex-direction: column;
				position: absolute !important;
				background: var(--input-field-bg-outline);
				border: 1px solid var(--border);
				border-radius: 4px;
				padding: 8px;
				z-index: 10000;
				overflow: hidden;
				animation: fadeIn 0.2s ease-out;
			}

			.emoji-tabs-container {
				display: flex;
				overflow-x: auto;
				padding-bottom: 5px;
				margin-bottom: 5px;
				border-bottom: 1px solid var(--border);
				gap: 4px;
				scrollbar-width: none;
				-ms-overflow-style: none;
				align-items: center;
			}

			.emoji-tabs-container::-webkit-scrollbar {
				display: none;
			}

			.emoji-content {
				display: grid;
				grid-template-columns: repeat(8, 1fr);
				gap: 4px;
				overflow-y: auto;
				max-height: 250px;
				background-color: transparent;
			}

			.emoji-content::-webkit-scrollbar {
				display: none;
			}

			.emoji-category-tab {
				display: flex;
				align-items: center;
				justify-content: center;
				background: transparent !important;
				border: none;
				border-radius: 4px;
				padding: 0;
				cursor: pointer;
				font-size: 20px;
				width: 30px;
				height: 30px;
				text-align: center;
				transition: background-color 0.2s;
				flex-shrink: 0;
			}

			.emoji-category-tab.active {
				background: var(--button-secondary-neutral-normal) !important;
			}

			.emoji-button {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 32px;
				height: 32px;
				border: none;
				cursor: pointer;
				font-size: 18px;
				padding: 4px;
				border-radius: 4px;
				background: none;
				transition: background-color 0.2s, transform 0.2s;
			}
			
			.emoji-button:hover {
				background-color: var(--button-secondary-neutral-normal) !important;
				transform: scale(1.1);
			}

			/* Custom Reaction Styles */
			[data-custom="true"]::after {
				content: '';
				position: absolute;
				bottom: -2px;
				right: -2px;
				width: 6px;
				height: 6px;
				background: var(--button-primary-normal);
				border-radius: 50%;
			}

			[data-custom="true"]:hover::before {
				content: attr(title);
				position: absolute;
				top: -35px;
				left: 50%;
				transform: translateX(-50%);
				background-color: rgba(0, 0, 0, 0.7);
				color: #ffffff;
				padding: 4px 8px;
				border-radius: 4px;
				font-size: 12px;
				white-space: nowrap;
				pointer-events: none;
				opacity: 0;
				animation: fadeIn 0.2s forwards;
				z-index: 9999;
			}

			.reaction-emoji-icon {
				font-size: 20px !important;
			}

			.reaction-emoji-icon:hover {
				transform: scale(1.1) !important;
			}

			.reaction-emoji-text {
				white-space: nowrap !important;
				overflow: hidden !important;
				text-overflow: ellipsis !important;
				max-width: 3ch !important;
			}

			/* Animations */
			@keyframes fadeIn {
				from { opacity: 0; }
				to { opacity: 1; }
			}

			@keyframes spin {
				to { transform: translateY(-50%) rotate(360deg); }
			}
		`;
		document.head.appendChild(style);
	};

	let mutationTimeout = null;

	/**
	 * MutationObserver to monitor for reaction list additions
	 * @author Anh Duc Le
	 */
	const observer = new MutationObserver((mutations) => {
		const hasReactionList = mutations.some(
			(m) =>
				m.type === "childList" &&
				m.addedNodes.length > 0 &&
				Array.from(m.addedNodes).some((n) =>
					n.querySelector?.(".reaction-emoji-list")
				)
		);

		if (hasReactionList) {
			clearTimeout(mutationTimeout);
			mutationTimeout = setTimeout(handleReactionList, 50);
		}
	});

	/**
	 * Handles the addition of custom reactions to the reaction list.
	 * @author Anh Duc Le
	 */
	const handleReactionList = () => {
		document.querySelectorAll(".reaction-emoji-list").forEach((list) => {
			if (list.getAttribute("data-extended") !== "true") {
				list.setAttribute("data-extended", "true");
				const wrapper = list.closest(".emoji-list-wrapper");
				if (wrapper) {
					list.querySelectorAll('[data-custom="true"]').forEach(
						(el) => {
							el.remove();
						}
					);

					customReactions.forEach((react, idx) => {
						const div = document.createElement("div");
						const divEmoji = document.createElement("span");
						div.className = "reaction-emoji-icon";

						const displayLength = [...react.icon].length;
						if (displayLength > 2) {
							div.className += " reaction-emoji-text";
						}

						div.setAttribute("data-custom", "true");
						div.style.animationDelay = `${20 * (idx + 7)}ms`;

						div.title = react.title || react.icon;
						divEmoji.innerText = react.icon;

						div.appendChild(divEmoji);
						list.appendChild(div);
						div.addEventListener("click", (e) => {
							e.preventDefault();
							e.stopPropagation();

							if (react.name === "customize") {
								if (!window.textInputPopup) {
									window.textInputPopup =
										createTextInputPopup();
								}

								window.textInputPopup.show();

								window.textInputPopup.confirmButton.onclick =
									async () => {
										const customText =
											window.textInputPopup.input.value.trim();

										const count =
											parseInt(
												window.textInputPopup.countInput
													.value
											) || 1;

										if (!customText) {
											alert(
												"Vui lòng nhập nội dung reaction!"
											);
											return;
										}

										if (count < 1 || count > 1000) {
											alert("Số lần gửi phải từ 1-1000!");
											return;
										}

										window.textInputPopup.setLoading(true);

										try {
											const customReaction = {
												...react,
												icon: customText,
												type: generateReactionHash(
													customText
												),
											};

											recentlyReaction.add(customText);

											for (let i = 0; i < count; i++) {
												sendReaction(
													wrapper,
													customReaction
												);

												if (i < count - 1) {
													await new Promise(
														(resolve) =>
															setTimeout(
																resolve,
																100
															)
													);
												}
											}

											console.log(
												`✅ Đã gửi ${count} reaction: ${customText}`
											);

											window.textInputPopup.hide();
										} catch (error) {
											console.error(
												"❌ Lỗi khi gửi reaction:",
												error
											);
											alert(
												"Có lỗi xảy ra khi gửi reaction!"
											);
										} finally {
											window.textInputPopup.setLoading(
												false
											);
										}
									};
								return;
							}

							sendReaction(wrapper, react);
						});
					});
				}
			}
		});
	};

	/**
	 * Sends the selected reaction using React's internal mechanisms.
	 * @author Anh Duc Le
	 * @param {HTMLElement} wrapper - The reaction button wrapper element
	 * @param {Object} react - The reaction object containing type and icon
	 */
	function sendReaction(wrapper, react) {
		const getReactFiber = (el) => {
			for (const k in el) if (k.startsWith("__react")) return el[k];
			return null;
		};

		let fiber = getReactFiber(wrapper);
		if (fiber) {
			while (fiber) {
				if (fiber.memoizedProps?.sendReaction) {
					fiber.memoizedProps.sendReaction({
						rType: react.type,
						rIcon: react.icon,
					});
					break;
				}
				fiber = fiber.return;
			}
		}
	}

	/**
	 * Generates a simple hash code from a string using DJB2-like algorithm
	 * Used to create unique reaction type IDs
	 * @param {string} str - The string to hash
	 * @returns {number} A positive integer hash value
	 * @author Anh Duc Le
	 */
	function generateReactionHash(str) {
		let hash = 0;
		for (let i = 0; i < str.length; i++) {
			hash = (hash << 5) - hash + str.charCodeAt(i);
			hash |= 0;
		}
		return Math.abs(hash);
	}

	/**
	 * Initializes the userscript by loading emoji data, setting up mutation observer, injecting styles, and loading recent reactions.
	 * @author Anh Duc Le
	 */
	const init = async () => {
		await loadEmojiData();
		observer.observe(document.body, { childList: true, subtree: true });
		injectCustomStyles();
		recentlyReaction.load();
	};

	// Initialize when DOM is ready
	"loading" === document.readyState
		? document.addEventListener("DOMContentLoaded", init)
		: init();
})();
