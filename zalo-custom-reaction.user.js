// ==UserScript==
// @name         Zalo Custom Reaction
// @description  A userscript that lets you create custom reactions on Zalo Web.
// @supportURL   https://github.com/ducladev/zalo-custom-reaction/issues
// @version      1.2.0
// @author       Anh Duc Le (https://github.com/ducladev)
// @match        https://*.zalo.me/*
// @match        https://chat.zalo.me/*
// @grant        none
// @license      MIT; https://opensource.org/licenses/MIT
// @icon         https://raw.githubusercontent.com/ducladev/zalo-custom-reaction/refs/heads/dev/icon.svg
// @run-at       document-idle
// @homepage     https://github.com/ducladev/zalo-custom-reaction
// @downloadURL  https://github.com/ducladev/zalo-custom-reaction/raw/refs/heads/main/zalo-custom-reaction.user.js
// @updateURL    https://github.com/ducladev/zalo-custom-reaction/raw/refs/heads/main/zalo-custom-reaction.meta.js
// ==/UserScript==

(function () {
	"use strict";

	const settings = {
		isRecently: false,
	};

	const reactions = [
		{
			type: 100,
			icon: "👏",
			name: "clap",
			title: "Vỗ tay",
			class: "emoji-sizer emoji-outer",
		},
		{
			type: 101,
			icon: "🎉",
			name: "huh",
			title: "Chúc mừng",
			class: "emoji-sizer emoji-outer",
		},
		{
			type: 102,
			icon: "🎨",
			name: "send_custom",
			title: "Tùy chỉnh",
			class: "emoji-sizer emoji-outer",
		},
	];

	const RecentlyReaction = {
		add(reaction) {
			const emojiCustom = {
				type: simpleHash(reaction),
				icon: reaction,
				name: reaction,
				title: "Gần đây",
				class: "emoji-sizer emoji-outer",
			};

			if (settings.isRecently) {
				reactions[reactions.length - 1] = emojiCustom;
			} else {
				reactions.push(emojiCustom);
				settings.isRecently = true;
			}

			try {
				localStorage.setItem(
					"recentlyCustomReaction",
					JSON.stringify(emojiCustom)
				);
			} catch (e) {
				console.warn("Cannot save to localStorage:", e);
			}
		},

		get() {
			try {
				const reaction = localStorage.getItem("recentlyCustomReaction");
				return reaction ? JSON.parse(reaction) : null;
			} catch (e) {
				console.warn("Cannot read from localStorage:", e);
				return null;
			}
		},

		load() {
			const reaction = this.get();
			if (reaction) {
				settings.isRecently = true;
				reactions.push(reaction);
			}
		},
	};

	function simpleHash(str) {
		let hash = 0;
		for (let i = 0; i < str.length; i++) {
			hash = (hash << 5) - hash + str.charCodeAt(i);
			hash |= 0;
		}
		return Math.abs(hash);
	}

	const emojiCategories = {
		Smileys: [
			"😀",
			"😃",
			"😄",
			"😁",
			"😆",
			"😅",
			"😂",
			"🤣",
			"🥲",
			"😊",
			"😇",
			"🙂",
			"🙃",
			"😉",
			"😌",
			"😍",
			"🥰",
			"😘",
			"😗",
			"😙",
			"😚",
			"😋",
			"😛",
			"😝",
			"😜",
			"🤪",
			"🤨",
			"🧐",
			"🤓",
			"😎",
			"🥸",
			"🤩",
			"🥳",
			"😏",
			"😒",
			"😞",
			"😔",
			"😟",
			"😕",
			"🙁",
			"☹️",
			"😣",
			"😖",
			"😫",
			"😩",
			"🥺",
			"😢",
			"😭",
			"😮‍💨",
			"😤",
			"😠",
			"😡",
			"🤬",
			"🤯",
			"😳",
			"🥵",
			"🥶",
			"😱",
			"😨",
			"😰",
			"😥",
		],
		Gestures: [
			"👋",
			"🤚",
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
			"👍",
			"👎",
			"✊",
			"👊",
			"🤛",
			"🤜",
			"👏",
			"🙌",
			"👐",
			"🤲",
			"🤝",
			"🙏",
		],
		People: [
			"👶",
			"👧",
			"🧒",
			"👦",
			"👩",
			"🧑",
			"👨",
			"👩‍🦱",
			"🧑‍🦱",
			"👨‍🦱",
			"👩‍🦰",
			"🧑‍🦰",
			"👨‍🦰",
			"👱‍♀️",
			"👱",
			"👱‍♂️",
			"👩‍🦳",
			"🧑‍🦳",
			"👨‍🦳",
			"👩‍🦲",
			"🧑‍🦲",
			"👨‍🦲",
			"🧔‍♀️",
			"🧔",
			"🧔‍♂️",
		],
		Animals: [
			"🐶",
			"🐱",
			"🐭",
			"🐹",
			"🐰",
			"🦊",
			"🐻",
			"🐼",
			"🐻‍❄️",
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
			"🐔",
			"🐧",
			"🐦",
			"🐤",
			"🐣",
			"🐥",
			"🦆",
			"🦅",
			"🦉",
			"🦇",
			"🐺",
			"🐗",
			"🐴",
			"🦄",
			"🐝",
			"🪱",
			"🐛",
			"🦋",
			"🐌",
			"🐞",
		],
		Food: [
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
			"🥦",
			"🥬",
			"🥒",
			"🌶",
			"🫑",
			"🌽",
			"🥕",
			"🥔",
			"🍠",
			"🥐",
			"🥯",
			"🍞",
			"🥖",
			"🥨",
			"🧀",
			"🥚",
			"🍳",
			"🧈",
			"🥞",
			"🧇",
			"🥓",
			"🍔",
			"🍟",
			"🍕",
			"🌭",
			"🥪",
			"🌮",
			"🌯",
			"🫔",
			"🥙",
		],
		Activities: [
			"⚽️",
			"🏀",
			"🏈",
			"⚾️",
			"🥎",
			"🎾",
			"🏐",
			"🏉",
			"🥏",
			"🎱",
			"🪀",
			"🏓",
			"🏸",
			"🏒",
			"🏑",
			"🥍",
			"🏏",
			"🪃",
			"🥅",
			"⛳️",
			"🪁",
			"🏹",
			"🎣",
			"🤿",
			"🥊",
			"🥋",
			"🎽",
			"🛹",
			"🛼",
			"🛷",
			"⛸",
			"🥌",
			"🎿",
		],
		Objects: [
			"⌚️",
			"📱",
			"💻",
			"⌨️",
			"🖥",
			"🖱",
			"🖨",
			"🕹",
			"🗜",
			"💾",
			"💿",
			"📀",
			"📼",
			"📷",
			"📸",
			"📹",
			"🎥",
			"📽",
			"🎞",
			"📞",
			"☎️",
			"📟",
			"📠",
			"📺",
			"📻",
			"🎙",
			"🎚",
			"🎛",
			"🧭",
			"⏱",
			"⏲",
			"⏰",
			"🕰",
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
			"✝️",
			"☪️",
			"🕉",
			"☸️",
			"✡️",
			"🔯",
			"🕎",
			"☯️",
			"☦️",
			"🛐",
			"⛎",
			"♈️",
			"♉️",
			"♊️",
			"♋️",
			"♌️",
			"♍️",
			"♎️",
			"♏️",
			"♐️",
			"♑️",
			"♒️",
			"♓️",
			"🆔",
			"⚛️",
		],
	};

	const cachedEmojiCategories = new Map();

	const createEmojiPicker = () => {
		const picker = document.createElement("div");
		picker.id = "emoji-picker";
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
			Smileys: "😀",
			Gestures: "👍",
			People: "👨",
			Animals: "🐱",
			Food: "🍔",
			Activities: "⚽️",
			Objects: "📱",
			Symbols: "❤️",
		};

		Object.keys(emojiCategories).forEach((category, idx) => {
			const tab = document.createElement("button");
			tab.className = "emoji-category-tab";
			if (idx === 0) tab.classList.add("active");
			tab.dataset.category = category;
			tab.textContent = categoryIcons[category] || category.slice(0, 1);
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
				e.target.id !== "emoji-button"
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

	const createTextInputPopup = () => {
		const popup = document.createElement("div");
		popup.className = "custom-reaction-popup";

		const title = document.createElement("div");
		title.className = "popup-title";
		title.textContent = "Tùy chỉnh reaction";

		const inputContainer = document.createElement("div");
		inputContainer.className = "popup-input-container";

		const input = document.createElement("input");
		input.type = "text";
		input.id = "custom-reaction-input";
		input.className = "popup-input";
		input.placeholder = "Nhập nội dung reaction...";
		input.maxLength = 15;

		const emojiButton = document.createElement("button");
		emojiButton.id = "emoji-button";
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

		const buttonContainer = document.createElement("div");
		buttonContainer.className = "popup-button-container";

		const cancelButton = document.createElement("button");
		cancelButton.className = "popup-button popup-button-cancel";
		cancelButton.textContent = "Hủy";
		cancelButton.onclick = () => hidePopup();

		const confirmButton = document.createElement("button");
		confirmButton.className = "popup-button popup-button-confirm";
		confirmButton.textContent = "Gửi";

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
			confirmButton,
			show: () => {
				popup.style.display = "flex";
				overlay.style.display = "block";
				input.value = "";
				charCounter.textContent = "0/15";
				previewText.textContent = "";
				input.focus();
			},
			hide: hidePopup,
			overlay,
		};
	};

	const enhanceReactionPanel = () => {
		const style = document.createElement("style");
		style.textContent = `
			/* Emoji Picker Styles */
			.emoji-picker {
				position: absolute !important;
				top: unset !important;
				left: 1px !important;
				right: 0;
				background: white !important;
				border-radius: 12px;
				box-shadow: 0 4px 16px rgba(0,0,0,0.2);
				padding: 8px;
				z-index: 10000;
				animation: fadeIn 0.2s ease-out;
				width: 296px;
				max-height: 350px;
				overflow: hidden;
				display: flex;
				flex-direction: column;
			}
			
			.emoji-tabs-container {
				display: flex;
				overflow-x: auto;
				padding-bottom: 5px;
				margin-bottom: 5px;
				border-bottom: 1px solid #eee;
				gap: 4px;
				scrollbar-width: none;
				-ms-overflow-style: none;
				height: 36px;
				min-height: 36px;
				align-items: center;
			}
			
			.emoji-tabs-container::-webkit-scrollbar {
				display: none;
			}
			
			.emoji-content {
				overflow-y: auto;
				display: grid;
				grid-template-columns: repeat(8, 1fr);
				gap: 4px;
				padding-right: 4px;
				max-height: 240px;
				background-color: white !important;
			}
			
			.emoji-content::-webkit-scrollbar {
				display: none;
			}
			
			.emoji-category-tab {
				background: transparent !important;
				border: none;
				border-radius: 6px;
				padding: 0;
				cursor: pointer;
				font-size: 16px;
				min-width: 28px;
				min-height: 28px;
				height: 28px;
				width: 28px;
				text-align: center;
				transition: background-color 0.2s;
				flex-shrink: 0;
				display: flex;
				align-items: center;
				justify-content: center;
				color: inherit !important;
			}
			
			.emoji-category-tab.active {
				background: #e3f2fd !important;
			}
			
			.emoji-button {
				background: none !important;
				border: none;
				cursor: pointer;
				font-size: 18px;
				padding: 4px;
				border-radius: 4px;
				transition: background-color 0.2s, transform 0.2s;
				color: inherit !important;
			}
			
			.emoji-button:hover {
				background-color: #f0f0f0 !important;
				transform: scale(1.1);
			}

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
				min-width: 300px;
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
				cursor: pointer;
				font-size: .875rem;
				font-weight: 400;
				line-height: 1.5;
				width: 100%;
			}

			.popup-input:focus {
				border-color: #2196F3;
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
				font-size: .875rem;
				font-weight: 400;
				line-height: 1.5;
				color: var(--text-primary);
				margin-top: 5px;
			}

			.popup-preview-container {
				display: flex;
				flex-direction: column;
				gap: 5px;
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
			
			.reaction-emoji-icon {
				font-size: 20px !important;
			}
			
			.reaction-emoji-text {
				white-space: nowrap !important;
				overflow: hidden !important;
				text-overflow: ellipsis !important;
				max-width: 3ch !important;
			}

			.reaction-emoji-icon:hover {
				transform: scale(1.1) !important;
			}
			
			/* Animations */
			@keyframes fadeIn {
				from { opacity: 0; }
				to { opacity: 1; }
			}

			/* Custom Reaction Indicator */
			[data-custom="true"]::after { 
				content: ''; 
				position: absolute; 
				bottom: -2px; 
				right: -2px; 
				width: 6px; 
				height: 6px; 
				background: #37b361; 
				border-radius: 50%; 
			}
			
			[data-custom="true"]:hover::before {
				content: attr(title);
				position: absolute;
				top: -35px;
				left: 50%;
				transform: translateX(-50%);
				background-color: rgba(0,0,0,0.7);
				color: white;
				padding: 4px 8px;
				border-radius: 4px;
				font-size: 12px;
				white-space: nowrap;
				pointer-events: none;
				opacity: 0;
				animation: fadeIn 0.2s forwards;
				z-index: 9999;
			}
		`;
		document.head.appendChild(style);
	};

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

	let mutationTimeout;
	const handleReactionList = () => {
		document.querySelectorAll(".reaction-emoji-list").forEach((list) => {
			if (list.getAttribute("data-extended") !== "true") {
				list.setAttribute("data-extended", "true");
				const wrapper = list.closest(".emoji-list-wrapper");
				if (wrapper) {
					const btn = wrapper.closest('[id^="reaction-btn-"]');
					const id = btn?.id.replace("reaction-btn-", "");

					reactions.forEach((react, idx) => {
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

							if (react.name === "send_custom") {
								if (!window.textInputPopup) {
									window.textInputPopup =
										createTextInputPopup();
								}

								window.textInputPopup.show();
								window.currentReactionContext = { wrapper, id };

								window.textInputPopup.confirmButton.onclick =
									() => {
										const customText =
											window.textInputPopup.input.value.trim();
										if (customText) {
											const customReaction = {
												...react,
												icon: customText,
												type: simpleHash(customText),
											};
											RecentlyReaction.add(customText);
											sendReaction(
												wrapper,
												id,
												customReaction
											);
											window.textInputPopup.hide();
										}
									};
								return;
							}

							sendReaction(wrapper, id, react);
						});
					});
				}
			}
		});
	};

	function sendReaction(wrapper, id, react) {
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

	const init = () => {
		observer.observe(document.body, { childList: true, subtree: true });
		enhanceReactionPanel();
		RecentlyReaction.load();
	};
	"loading" === document.readyState
		? document.addEventListener("DOMContentLoaded", init)
		: init();
})();
