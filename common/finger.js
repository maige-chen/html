let wasm_bindgen;
(function () {
  const __exports = {};
  let script_src;
  if (typeof document !== "undefined" && document.currentScript !== null) {
    script_src = new URL(document.currentScript.src, location.href).toString();
  }
  let wasm = undefined;

  let cachedUint8ArrayMemory0 = null;

  function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
      cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
  }

  let cachedTextDecoder =
    typeof TextDecoder !== "undefined"
      ? new TextDecoder("utf-8", {ignoreBOM: true, fatal: true})
      : {
          decode: () => {
            throw Error("TextDecoder not available");
          },
        };

  if (typeof TextDecoder !== "undefined") {
    cachedTextDecoder.decode();
  }

  function decodeText(ptr, len) {
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
  }

  function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return decodeText(ptr, len);
  }

  function addToExternrefTable0(obj) {
    const idx = wasm.__externref_table_alloc();
    wasm.__wbindgen_export_2.set(idx, obj);
    return idx;
  }

  function handleError(f, args) {
    try {
      return f.apply(this, args);
    } catch (e) {
      const idx = addToExternrefTable0(e);
      wasm.__wbindgen_exn_store(idx);
    }
  }

  function isLikeNone(x) {
    return x === undefined || x === null;
  }

  let WASM_VECTOR_LEN = 0;

  function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1, 1) >>> 0;
    getUint8ArrayMemory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
  }

  let cachedDataViewMemory0 = null;

  function getDataViewMemory0() {
    if (
      cachedDataViewMemory0 === null ||
      cachedDataViewMemory0.buffer.detached === true ||
      (cachedDataViewMemory0.buffer.detached === undefined &&
        cachedDataViewMemory0.buffer !== wasm.memory.buffer)
    ) {
      cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
  }

  const cachedTextEncoder =
    typeof TextEncoder !== "undefined"
      ? new TextEncoder("utf-8")
      : {
          encode: () => {
            throw Error("TextEncoder not available");
          },
        };

  const encodeString =
    typeof cachedTextEncoder.encodeInto === "function"
      ? function (arg, view) {
          return cachedTextEncoder.encodeInto(arg, view);
        }
      : function (arg, view) {
          const buf = cachedTextEncoder.encode(arg);
          view.set(buf);
          return {
            read: arg.length,
            written: buf.length,
          };
        };

  function passStringToWasm0(arg, malloc, realloc) {
    if (realloc === undefined) {
      const buf = cachedTextEncoder.encode(arg);
      const ptr = malloc(buf.length, 1) >>> 0;
      getUint8ArrayMemory0()
        .subarray(ptr, ptr + buf.length)
        .set(buf);
      WASM_VECTOR_LEN = buf.length;
      return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8ArrayMemory0();

    let offset = 0;

    for (; offset < len; offset++) {
      const code = arg.charCodeAt(offset);
      if (code > 0x7f) break;
      mem[ptr + offset] = code;
    }

    if (offset !== len) {
      if (offset !== 0) {
        arg = arg.slice(offset);
      }
      ptr = realloc(ptr, len, (len = offset + arg.length * 3), 1) >>> 0;
      const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
      const ret = encodeString(arg, view);

      offset += ret.written;
      ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
  }

  function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == "number" || type == "boolean" || val == null) {
      return `${val}`;
    }
    if (type == "string") {
      return `"${val}"`;
    }
    if (type == "symbol") {
      const description = val.description;
      if (description == null) {
        return "Symbol";
      } else {
        return `Symbol(${description})`;
      }
    }
    if (type == "function") {
      const name = val.name;
      if (typeof name == "string" && name.length > 0) {
        return `Function(${name})`;
      } else {
        return "Function";
      }
    }
    // objects
    if (Array.isArray(val)) {
      const length = val.length;
      let debug = "[";
      if (length > 0) {
        debug += debugString(val[0]);
      }
      for (let i = 1; i < length; i++) {
        debug += ", " + debugString(val[i]);
      }
      debug += "]";
      return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches && builtInMatches.length > 1) {
      className = builtInMatches[1];
    } else {
      // Failed to match the standard '[object ClassName]'
      return toString.call(val);
    }
    if (className == "Object") {
      // we're a user defined class or Object
      // JSON.stringify avoids problems with cycles, and is generally much
      // easier than looping through ownProperties of `val`.
      try {
        return "Object(" + JSON.stringify(val) + ")";
      } catch (_) {
        return "Object";
      }
    }
    // errors
    if (val instanceof Error) {
      return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
  }

  __exports.run = function () {
    wasm.run();
  };

  const FingerFinalization =
    typeof FinalizationRegistry === "undefined"
      ? {register: () => {}, unregister: () => {}}
      : new FinalizationRegistry((ptr) => wasm.__wbg_finger_free(ptr >>> 0, 1));

  class Finger {
    static __wrap(ptr) {
      ptr = ptr >>> 0;
      const obj = Object.create(Finger.prototype);
      obj.__wbg_ptr = ptr;
      FingerFinalization.register(obj, obj.__wbg_ptr, obj);
      return obj;
    }

    __destroy_into_raw() {
      const ptr = this.__wbg_ptr;
      this.__wbg_ptr = 0;
      FingerFinalization.unregister(this);
      return ptr;
    }

    free() {
      const ptr = this.__destroy_into_raw();
      wasm.__wbg_finger_free(ptr, 0);
    }
    /**
     * @param {string} data
     * @returns {string}
     */
    hash(data) {
      let deferred2_0;
      let deferred2_1;
      try {
        const ptr0 = passStringToWasm0(data, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.finger_hash(this.__wbg_ptr, ptr0, len0);
        deferred2_0 = ret[0];
        deferred2_1 = ret[1];
        return getStringFromWasm0(ret[0], ret[1]);
      } finally {
        wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
      }
    }
    /**
     * @returns {string}
     */
    print() {
      let deferred1_0;
      let deferred1_1;
      try {
        const ret = wasm.finger_print(this.__wbg_ptr);
        deferred1_0 = ret[0];
        deferred1_1 = ret[1];
        return getStringFromWasm0(ret[0], ret[1]);
      } finally {
        wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
      }
    }
    /**
     * @param {string} token
     * @returns {string}
     */
    refresh(token) {
      let deferred2_0;
      let deferred2_1;
      try {
        const ptr0 = passStringToWasm0(token, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.finger_refresh(this.__wbg_ptr, ptr0, len0);
        deferred2_0 = ret[0];
        deferred2_1 = ret[1];
        return getStringFromWasm0(ret[0], ret[1]);
      } finally {
        wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
      }
    }
  }
  __exports.Finger = Finger;

  const EXPECTED_RESPONSE_TYPES = new Set(["basic", "cors", "default"]);

  async function __wbg_load(module, imports) {
    if (typeof Response === "function" && module instanceof Response) {
      if (typeof WebAssembly.instantiateStreaming === "function") {
        try {
          return await WebAssembly.instantiateStreaming(module, imports);
        } catch (e) {
          const validResponse = module.ok && EXPECTED_RESPONSE_TYPES.has(module.type);

          if (validResponse && module.headers.get("Content-Type") !== "application/wasm") {
            console.warn(
              "`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",
              e,
            );
          } else {
            throw e;
          }
        }
      }

      const bytes = await module.arrayBuffer();
      return await WebAssembly.instantiate(bytes, imports);
    } else {
      const instance = await WebAssembly.instantiate(module, imports);

      if (instance instanceof WebAssembly.Instance) {
        return {instance, module};
      } else {
        return instance;
      }
    }
  }

  function __wbg_get_imports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbg_addColorStop_ba0e952eb61b0875 = function () {
      return handleError(function (arg0, arg1, arg2, arg3) {
        arg0.addColorStop(arg1, getStringFromWasm0(arg2, arg3));
      }, arguments);
    };
    imports.wbg.__wbg_appendChild_0455c3748a28445a = function () {
      return handleError(function (arg0, arg1) {
        const ret = arg0.appendChild(arg1);
        return ret;
      }, arguments);
    };
    imports.wbg.__wbg_arc_555f79118db98db0 = function () {
      return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
        arg0.arc(arg1, arg2, arg3, arg4, arg5);
      }, arguments);
    };
    imports.wbg.__wbg_beginPath_fdb62f35848e1549 = function (arg0) {
      arg0.beginPath();
    };
    imports.wbg.__wbg_bezierCurveTo_63a3c773defebb80 = function (
      arg0,
      arg1,
      arg2,
      arg3,
      arg4,
      arg5,
      arg6,
    ) {
      arg0.bezierCurveTo(arg1, arg2, arg3, arg4, arg5, arg6);
    };
    imports.wbg.__wbg_body_9ce0d68f6f8c4231 = function (arg0) {
      const ret = arg0.body;
      return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    };
    imports.wbg.__wbg_call_fbe8be8bf6436ce5 = function () {
      return handleError(function (arg0, arg1) {
        const ret = arg0.call(arg1);
        return ret;
      }, arguments);
    };
    imports.wbg.__wbg_colorDepth_041ca6c71217992c = function () {
      return handleError(function (arg0) {
        const ret = arg0.colorDepth;
        return ret;
      }, arguments);
    };
    imports.wbg.__wbg_createElement_12aa94dc33c0480f = function () {
      return handleError(function (arg0, arg1, arg2) {
        const ret = arg0.createElement(getStringFromWasm0(arg1, arg2));
        return ret;
      }, arguments);
    };
    imports.wbg.__wbg_createLinearGradient_6095b8448817e70e = function (
      arg0,
      arg1,
      arg2,
      arg3,
      arg4,
    ) {
      const ret = arg0.createLinearGradient(arg1, arg2, arg3, arg4);
      return ret;
    };
    imports.wbg.__wbg_data_54431a3083291e04 = function (arg0, arg1) {
      const ret = arg1.data;
      const ptr1 = passArray8ToWasm0(ret, wasm.__wbindgen_malloc);
      const len1 = WASM_VECTOR_LEN;
      getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
      getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbg_defineProperty_6a428a581612fed4 = function (arg0, arg1, arg2) {
      const ret = Object.defineProperty(arg0, arg1, arg2);
      return ret;
    };
    imports.wbg.__wbg_document_62abd3e2b80cbd9e = function (arg0) {
      const ret = arg0.document;
      return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    };
    imports.wbg.__wbg_fillRect_12420257914ab070 = function (arg0, arg1, arg2, arg3, arg4) {
      arg0.fillRect(arg1, arg2, arg3, arg4);
    };
    imports.wbg.__wbg_fillText_a503c443f9ec1cd1 = function () {
      return handleError(function (arg0, arg1, arg2, arg3, arg4) {
        arg0.fillText(getStringFromWasm0(arg1, arg2), arg3, arg4);
      }, arguments);
    };
    imports.wbg.__wbg_fill_317eac25a6e8c6dc = function (arg0) {
      arg0.fill();
    };
    imports.wbg.__wbg_finger_new = function (arg0) {
      const ret = Finger.__wrap(arg0);
      return ret;
    };
    imports.wbg.__wbg_getContext_aaf9a2894cb5450a = function () {
      return handleError(function (arg0, arg1, arg2) {
        const ret = arg0.getContext(getStringFromWasm0(arg1, arg2));
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
      }, arguments);
    };
    imports.wbg.__wbg_getImageData_5309e4e3b9caef60 = function () {
      return handleError(function (arg0, arg1, arg2, arg3, arg4) {
        const ret = arg0.getImageData(arg1, arg2, arg3, arg4);
        return ret;
      }, arguments);
    };
    imports.wbg.__wbg_instanceof_HtmlSpanElement_a601d08cba8dbb6a = function (arg0) {
      let result;
      try {
        result = arg0 instanceof HTMLSpanElement;
      } catch (_) {
        result = false;
      }
      const ret = result;
      return ret;
    };
    imports.wbg.__wbg_instanceof_OffscreenCanvasRenderingContext2d_c5347ee7a1ff463e = function (
      arg0,
    ) {
      let result;
      try {
        result = arg0 instanceof OffscreenCanvasRenderingContext2D;
      } catch (_) {
        result = false;
      }
      const ret = result;
      return ret;
    };
    imports.wbg.__wbg_instanceof_Window_68f3f67bad1729c1 = function (arg0) {
      let result;
      try {
        result = arg0 instanceof Window;
      } catch (_) {
        result = false;
      }
      const ret = result;
      return ret;
    };
    imports.wbg.__wbg_moveTo_5b1d7ac13beba368 = function (arg0, arg1, arg2) {
      arg0.moveTo(arg1, arg2);
    };
    imports.wbg.__wbg_navigator_fc64ba1417939b25 = function (arg0) {
      const ret = arg0.navigator;
      return ret;
    };
    imports.wbg.__wbg_new_07b483f72211fd66 = function () {
      const ret = new Object();
      return ret;
    };
    imports.wbg.__wbg_new_95c080d0ad2cb9b9 = function () {
      return handleError(function (arg0, arg1) {
        const ret = new OffscreenCanvas(arg0 >>> 0, arg1 >>> 0);
        return ret;
      }, arguments);
    };
    imports.wbg.__wbg_newnoargs_ff528e72d35de39a = function (arg0, arg1) {
      const ret = new Function(getStringFromWasm0(arg0, arg1));
      return ret;
    };
    imports.wbg.__wbg_now_61025efb4e9031a5 = function () {
      const ret = Date.now();
      return ret;
    };
    imports.wbg.__wbg_offsetHeight_df1cf560664c9813 = function (arg0) {
      const ret = arg0.offsetHeight;
      return ret;
    };
    imports.wbg.__wbg_offsetWidth_6df51a46dacdf354 = function (arg0) {
      const ret = arg0.offsetWidth;
      return ret;
    };
    imports.wbg.__wbg_pixelDepth_d22edbe1bf2e9b96 = function () {
      return handleError(function (arg0) {
        const ret = arg0.pixelDepth;
        return ret;
      }, arguments);
    };
    imports.wbg.__wbg_remove_f71492caee074d45 = function (arg0) {
      arg0.remove();
    };
    imports.wbg.__wbg_restore_5cd4f602c14b5216 = function (arg0) {
      arg0.restore();
    };
    imports.wbg.__wbg_rotate_0d5db68e4ea006c5 = function () {
      return handleError(function (arg0, arg1) {
        arg0.rotate(arg1);
      }, arguments);
    };
    imports.wbg.__wbg_save_a801dbf350ac3566 = function (arg0) {
      arg0.save();
    };
    imports.wbg.__wbg_screen_832d0781e7e84cb0 = function () {
      return handleError(function (arg0) {
        const ret = arg0.screen;
        return ret;
      }, arguments);
    };
    imports.wbg.__wbg_setProperty_5ee26828600418f6 = function () {
      return handleError(function (arg0, arg1, arg2, arg3, arg4) {
        arg0.setProperty(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
      }, arguments);
    };
    imports.wbg.__wbg_set_c43293f93a35998a = function () {
      return handleError(function (arg0, arg1, arg2) {
        const ret = Reflect.set(arg0, arg1, arg2);
        return ret;
      }, arguments);
    };
    imports.wbg.__wbg_setfillStyle_5d75b1da15cd8b8d = function (arg0, arg1) {
      arg0.fillStyle = arg1;
    };
    imports.wbg.__wbg_setfillStyle_973c280b8aa5dde8 = function (arg0, arg1, arg2) {
      arg0.fillStyle = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_setfont_ce362126b219d3c5 = function (arg0, arg1, arg2) {
      arg0.font = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_setglobalAlpha_48e3e4b57f72cc50 = function (arg0, arg1) {
      arg0.globalAlpha = arg1;
    };
    imports.wbg.__wbg_setlineCap_bff270fd677230f3 = function (arg0, arg1, arg2) {
      arg0.lineCap = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_setlineWidth_6a7f42b2f79ab55d = function (arg0, arg1) {
      arg0.lineWidth = arg1;
    };
    imports.wbg.__wbg_setshadowBlur_3c7efed2815c1157 = function (arg0, arg1) {
      arg0.shadowBlur = arg1;
    };
    imports.wbg.__wbg_setshadowColor_dd2f398c919e6528 = function (arg0, arg1, arg2) {
      arg0.shadowColor = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_setshadowOffsetX_639215ec5ffdd86c = function (arg0, arg1) {
      arg0.shadowOffsetX = arg1;
    };
    imports.wbg.__wbg_setshadowOffsetY_382a526a848c67e8 = function (arg0, arg1) {
      arg0.shadowOffsetY = arg1;
    };
    imports.wbg.__wbg_setstrokeStyle_b6e6f06e71e37f9f = function (arg0, arg1, arg2) {
      arg0.strokeStyle = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_settextBaseline_c55ead6731cbd9d9 = function (arg0, arg1, arg2) {
      arg0.textBaseline = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_settextContent_fc762464c7b64004 = function (arg0, arg1, arg2) {
      arg0.textContent = arg1 === 0 ? undefined : getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_static_accessor_GLOBAL_487c52c58d65314d = function () {
      const ret = typeof global === "undefined" ? null : global;
      return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    };
    imports.wbg.__wbg_static_accessor_GLOBAL_THIS_ee9704f328b6b291 = function () {
      const ret = typeof globalThis === "undefined" ? null : globalThis;
      return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    };
    imports.wbg.__wbg_static_accessor_SELF_78c9e3071b912620 = function () {
      const ret = typeof self === "undefined" ? null : self;
      return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    };
    imports.wbg.__wbg_static_accessor_WINDOW_a093d21393777366 = function () {
      const ret = typeof window === "undefined" ? null : window;
      return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    };
    imports.wbg.__wbg_stroke_118503b97273c6a2 = function (arg0) {
      arg0.stroke();
    };
    imports.wbg.__wbg_style_7337fe001c46487c = function (arg0) {
      const ret = arg0.style;
      return ret;
    };
    imports.wbg.__wbg_translate_7e05213434464ba0 = function () {
      return handleError(function (arg0, arg1, arg2) {
        arg0.translate(arg1, arg2);
      }, arguments);
    };
    imports.wbg.__wbg_userAgent_a24a493cd80cbd00 = function () {
      return handleError(function (arg0, arg1) {
        const ret = arg1.userAgent;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
      }, arguments);
    };
    imports.wbg.__wbindgen_debug_string = function (arg0, arg1) {
      const ret = debugString(arg1);
      const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
      const len1 = WASM_VECTOR_LEN;
      getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
      getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbindgen_init_externref_table = function () {
      const table = wasm.__wbindgen_export_2;
      const offset = table.grow(4);
      table.set(0, undefined);
      table.set(offset + 0, undefined);
      table.set(offset + 1, null);
      table.set(offset + 2, true);
      table.set(offset + 3, false);
    };
    imports.wbg.__wbindgen_is_undefined = function (arg0) {
      const ret = arg0 === undefined;
      return ret;
    };
    imports.wbg.__wbindgen_rethrow = function (arg0) {
      throw arg0;
    };
    imports.wbg.__wbindgen_string_new = function (arg0, arg1) {
      const ret = getStringFromWasm0(arg0, arg1);
      return ret;
    };
    imports.wbg.__wbindgen_throw = function (arg0, arg1) {
      throw new Error(getStringFromWasm0(arg0, arg1));
    };

    return imports;
  }

  function __wbg_init_memory(imports, memory) {}

  function __wbg_finalize_init(instance, module) {
    wasm = instance.exports;
    __wbg_init.__wbindgen_wasm_module = module;
    cachedDataViewMemory0 = null;
    cachedUint8ArrayMemory0 = null;

    wasm.__wbindgen_start();
    return wasm;
  }

  function initSync(module) {
    if (wasm !== undefined) return wasm;

    if (typeof module !== "undefined") {
      if (Object.getPrototypeOf(module) === Object.prototype) {
        ({module} = module);
      } else {
        console.warn("using deprecated parameters for `initSync()`; pass a single object instead");
      }
    }

    const imports = __wbg_get_imports();

    __wbg_init_memory(imports);

    if (!(module instanceof WebAssembly.Module)) {
      module = new WebAssembly.Module(module);
    }

    const instance = new WebAssembly.Instance(module, imports);

    return __wbg_finalize_init(instance, module);
  }

  async function __wbg_init(module_or_path) {
    if (wasm !== undefined) return wasm;

    if (typeof module_or_path !== "undefined") {
      if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
        ({module_or_path} = module_or_path);
      } else {
        console.warn(
          "using deprecated parameters for the initialization function; pass a single object instead",
        );
      }
    }

    if (typeof module_or_path === "undefined" && typeof script_src !== "undefined") {
      module_or_path = script_src.replace(/\.js$/, "_bg.wasm");
    }
    const imports = __wbg_get_imports();

    if (
      typeof module_or_path === "string" ||
      (typeof Request === "function" && module_or_path instanceof Request) ||
      (typeof URL === "function" && module_or_path instanceof URL)
    ) {
      module_or_path = fetch(module_or_path);
    }

    __wbg_init_memory(imports);

    const {instance, module} = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module);
  }

  wasm_bindgen = Object.assign(__wbg_init, {initSync}, __exports);
  (async () => {
    await wasm_bindgen();
  })();
})();
