// ==UserScript==
// @name         Zalo Custom Reaction
// @version      1.2.0
// @description  A userscript that lets you create custom reactions on Zalo Web.
// @author       Anh Duc Le
// @match        https://*.zalo.me/*
// @match        https://chat.zalo.me/*
// @grant        none
// @run-at       document-idle
// @downloadURL  https://github.com/ducladev/zalo-custom-reaction/raw/refs/heads/main/zalo-custom-reaction.user.js
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
		popup.id = "custom-reaction-popup";
		popup.style.cssText = `
			position: fixed;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			background: white;
			border-radius: 12px;
			box-shadow: 0 4px 20px rgba(0,0,0,0.25);
			padding: 20px;
			z-index: 9999;
			display: none;
			flex-direction: column;
			gap: 15px;
			min-width: 300px;
			font-family: 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', sans-serif;
			animation: fadeIn 0.2s ease-out;
		`;

		const title = document.createElement("div");
		title.textContent = "Tùy chỉnh reaction";
		title.style.cssText =
			"font-weight: bold; font-size: 16px; color: #333; margin-bottom: 5px;";

		const inputContainer = document.createElement("div");
		inputContainer.style.cssText = "position: relative;";

		const input = document.createElement("input");
		input.type = "text";
		input.id = "custom-reaction-input";
		input.placeholder = "Nhập nội dung reaction...";
		input.maxLength = 15;
		input.style.cssText = `
			padding: 10px 12px;
			padding-right: 40px;
			border: 2px solid #e0e0e0;
			border-radius: 8px;
			width: 100%;
			box-sizing: border-box;
			font-size: 14px;
			transition: border-color 0.2s;
			outline: none;
		`;
		input.addEventListener("focus", () => {
			input.style.borderColor = "#2196F3";
		});
		input.addEventListener("blur", () => {
			input.style.borderColor = "#e0e0e0";
		});

		const emojiButton = document.createElement("button");
		emojiButton.id = "emoji-button";
		emojiButton.textContent = "😊";
		emojiButton.style.cssText = `
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
		`;
		emojiButton.onmouseover = () => {
			emojiButton.style.opacity = "1";
			emojiButton.style.transform = "translateY(-50%) scale(1.1)";
		};
		emojiButton.onmouseout = () => {
			emojiButton.style.opacity = "0.7";
			emojiButton.style.transform = "translateY(-50%) scale(1)";
		};

		const emojiPicker = createEmojiPicker();

		emojiButton.addEventListener("click", (e) => {
			e.preventDefault();
			e.stopPropagation();
			if (
				emojiPicker.style.display === "none" ||
				emojiPicker.style.display === ""
			) {
				emojiPicker.style.display = "flex";
			} else {
				emojiPicker.style.display = "none";
			}
		});

		const previewContainer = document.createElement("div");
		previewContainer.style.cssText =
			"margin-top: 5px; display: flex; flex-direction: column; gap: 5px;";

		const previewLabel = document.createElement("div");
		previewLabel.textContent = "Xem trước:";
		previewLabel.style.cssText = "font-size: 12px; color: #666;";

		const previewText = document.createElement("div");
		previewText.style.cssText = `
			padding: 6px 10px;
			background: #e3f2fd;
			border-radius: 10px;
			font-size: 14px;
			display: inline-block;
			max-width: fit-content;
			min-height: 20px;
		`;

		previewContainer.appendChild(previewLabel);
		previewContainer.appendChild(previewText);

		const updatePreview = () => {
			const text = input.value;
			previewText.textContent = text;
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
		charCounter.style.cssText =
			"position: absolute; right: 10px; bottom: -18px; font-size: 11px; color: #999;";
		charCounter.textContent = "0/15";

		input.addEventListener("input", () => {
			charCounter.textContent = `${input.value.length}/15`;
		});

		inputContainer.appendChild(input);
		inputContainer.appendChild(emojiButton);
		inputContainer.appendChild(charCounter);
		inputContainer.appendChild(emojiPicker);

		const buttonContainer = document.createElement("div");
		buttonContainer.style.cssText =
			"display: flex; justify-content: flex-end; gap: 12px; margin-top: 10px;";

		const cancelButton = document.createElement("button");
		cancelButton.textContent = "Hủy";
		cancelButton.style.cssText = `
			padding: 8px 16px;
			border: none;
			border-radius: 6px;
			background-color: #f5f5f5;
			color: #333;
			font-weight: 500;
			cursor: pointer;
			transition: background-color 0.2s;
		`;
		cancelButton.onmouseover = () => {
			cancelButton.style.backgroundColor = "#e0e0e0";
		};
		cancelButton.onmouseout = () => {
			cancelButton.style.backgroundColor = "#f5f5f5";
		};
		cancelButton.onclick = () => {
			hidePopup();
		};

		const confirmButton = document.createElement("button");
		confirmButton.textContent = "Gửi";
		confirmButton.style.cssText = `
			padding: 8px 16px;
			border: none;
			border-radius: 6px;
			background-color: #2196F3;
			color: white;
			font-weight: 500;
			cursor: pointer;
			transition: background-color 0.2s;
		`;
		confirmButton.onmouseover = () => {
			confirmButton.style.backgroundColor = "#1976D2";
		};
		confirmButton.onmouseout = () => {
			confirmButton.style.backgroundColor = "#2196F3";
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
		popup.appendChild(buttonContainer);

		const overlay = document.createElement("div");
		overlay.id = "custom-reaction-overlay";
		overlay.style.cssText = `
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background: rgba(0,0,0,0.4);
			z-index: 9998;
			display: none;
			animation: fadeIn 0.2s ease-out;
		`;
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
				background: white;
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
                background-color: white;
			}
			
			.emoji-content::-webkit-scrollbar {
				display: none;
			}
			
			.emoji-category-tab {
				background: transparent;
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
			}
			
			.emoji-category-tab.active {
				background: #e3f2fd;
			}
			
			.emoji-button {
				background: none;
				border: none;
				cursor: pointer;
				font-size: 18px;
				padding: 4px;
				border-radius: 4px;
				transition: background-color 0.2s, transform 0.2s;
			}
			
			.emoji-button:hover {
				background-color: #f0f0f0;
				transform: scale(1.1);
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

	const style = document.createElement("style");
	style.textContent = `
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

	const init = () => {
		observer.observe(document.body, { childList: true, subtree: true });
		enhanceReactionPanel();
		RecentlyReaction.load();
	};
	"loading" === document.readyState
		? document.addEventListener("DOMContentLoaded", init)
		: init();
})();
