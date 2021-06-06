module.exports = native => {
  const ctx = {
    nbtLoop: (buffer, offset) => {
      const values = []
      while (buffer[offset] != 0) {
        const n = ctx.nbt(buffer, offset)
        values.push(n.value)
        offset += n.size
      }
      return { value: values, size: buffer.length - offset }
    },
    byterot: (buffer, offset) => {
      const val = buffer.readUint8(offset)
      return { value: (val * (360 / 256)), size: 1 }
    },
    i8: native.i8,
    u8: native.u8,
    i16: native.i16,
    u16: native.u16,
    i32: native.i32,
    u32: native.u32,
    f32: native.f32,
    f64: native.f64,
    li8: native.li8,
    lu8: native.lu8,
    li16: native.li16,
    lu16: native.lu16,
    li32: native.li32,
    lu32: native.lu32,
    lf32: native.lf32,
    lf64: native.lf64,
    i64: native.i64,
    li64: native.li64,
    u64: native.u64,
    lu64: native.lu64,
    varint: native.varint,
    bool: native.bool,
    pstring: native.pstring,
    buffer: native.buffer,
    void: native.void,
    bitfield: native.bitfield,
    cstring: native.cstring,
    mapper: native.mapper,
    varint64: native.varint64,
    uuid: native.uuid,
    restBuffer: native.restBuffer,
    nbt: native.nbt,
    lnbt: native.lnbt,
    zigzag64: native.zigzag64,
    zigzag32: native.zigzag32,
    varint32: function () { return ctx.varint(...arguments) },
    MapInfo: native.MapInfo,
    BehaviourPackInfos: (buffer, offset) => {
      const { value: count, size: countSize } = (ctx.li16)(buffer, offset)
      if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
      const data = []
      let size = countSize
      for (let i = 0; i < count; i++) {
        const elem = ((buffer, offset) => {
        let { value: uuid, size: uuidSize } = (ctx.string)(buffer, offset)
        let { value: version, size: versionSize } = (ctx.string)(buffer, offset + uuidSize)
        let { value: size1, size: size1Size } = (ctx.lu64)(buffer, offset + uuidSize + versionSize)
        let { value: content_key, size: content_keySize } = (ctx.string)(buffer, offset + uuidSize + versionSize + size1Size)
        let { value: sub_pack_name, size: sub_pack_nameSize } = (ctx.string)(buffer, offset + uuidSize + versionSize + size1Size + content_keySize)
        let { value: content_identity, size: content_identitySize } = (ctx.string)(buffer, offset + uuidSize + versionSize + size1Size + content_keySize + sub_pack_nameSize)
        let { value: has_scripts, size: has_scriptsSize } = (ctx.bool)(buffer, offset + uuidSize + versionSize + size1Size + content_keySize + sub_pack_nameSize + content_identitySize)
        return { value: { uuid, version, size: size1, content_key, sub_pack_name, content_identity, has_scripts }, size: uuidSize + versionSize + size1Size + content_keySize + sub_pack_nameSize + content_identitySize + has_scriptsSize}
      })(buffer, offset + size)
        data.push(elem.value)
        size += elem.size
      }
      return { value: data, size }
    },
    TexturePackInfos: (buffer, offset) => {
      const { value: count, size: countSize } = (ctx.li16)(buffer, offset)
      if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
      const data = []
      let size = countSize
      for (let i = 0; i < count; i++) {
        const elem = ((buffer, offset) => {
        let { value: uuid, size: uuidSize } = (ctx.string)(buffer, offset)
        let { value: version, size: versionSize } = (ctx.string)(buffer, offset + uuidSize)
        let { value: size1, size: size1Size } = (ctx.lu64)(buffer, offset + uuidSize + versionSize)
        let { value: content_key, size: content_keySize } = (ctx.string)(buffer, offset + uuidSize + versionSize + size1Size)
        let { value: sub_pack_name, size: sub_pack_nameSize } = (ctx.string)(buffer, offset + uuidSize + versionSize + size1Size + content_keySize)
        let { value: content_identity, size: content_identitySize } = (ctx.string)(buffer, offset + uuidSize + versionSize + size1Size + content_keySize + sub_pack_nameSize)
        let { value: has_scripts, size: has_scriptsSize } = (ctx.bool)(buffer, offset + uuidSize + versionSize + size1Size + content_keySize + sub_pack_nameSize + content_identitySize)
        let { value: rtx_enabled, size: rtx_enabledSize } = (ctx.bool)(buffer, offset + uuidSize + versionSize + size1Size + content_keySize + sub_pack_nameSize + content_identitySize + has_scriptsSize)
        return { value: { uuid, version, size: size1, content_key, sub_pack_name, content_identity, has_scripts, rtx_enabled }, size: uuidSize + versionSize + size1Size + content_keySize + sub_pack_nameSize + content_identitySize + has_scriptsSize + rtx_enabledSize}
      })(buffer, offset + size)
        data.push(elem.value)
        size += elem.size
      }
      return { value: data, size }
    },
    ResourcePackIdVersions: (buffer, offset) => {
      const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
      if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
      const data = []
      let size = countSize
      for (let i = 0; i < count; i++) {
        const elem = ((buffer, offset) => {
        let { value: uuid, size: uuidSize } = (ctx.string)(buffer, offset)
        let { value: version, size: versionSize } = (ctx.string)(buffer, offset + uuidSize)
        let { value: name, size: nameSize } = (ctx.string)(buffer, offset + uuidSize + versionSize)
        return { value: { uuid, version, name }, size: uuidSize + versionSize + nameSize}
      })(buffer, offset + size)
        data.push(elem.value)
        size += elem.size
      }
      return { value: data, size }
    },
    ResourcePackIds: (buffer, offset) => {
      const { value: count, size: countSize } = (ctx.li16)(buffer, offset)
      if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
      const data = []
      let size = countSize
      for (let i = 0; i < count; i++) {
        const elem = (ctx.string)(buffer, offset + size)
        data.push(elem.value)
        size += elem.size
      }
      return { value: data, size }
    },
    Experiment: (buffer, offset) => {
      let { value: name, size: nameSize } = (ctx.string)(buffer, offset)
      let { value: enabled, size: enabledSize } = (ctx.bool)(buffer, offset + nameSize)
      return { value: { name, enabled }, size: nameSize + enabledSize}
    },
    Experiments: (buffer, offset) => {
      const { value: count, size: countSize } = (ctx.li32)(buffer, offset)
      if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
      const data = []
      let size = countSize
      for (let i = 0; i < count; i++) {
        const elem = (ctx.Experiment)(buffer, offset + size)
        data.push(elem.value)
        size += elem.size
      }
      return { value: data, size }
    },
    GameMode: (buffer, offset) => {
      const { value, size } = (ctx.zigzag32)(buffer, offset)
      return { value: {"0":"survival","1":"creative","2":"adventure","3":"survival_spectator","4":"creative_spectator","5":"fallback"}[value] || value, size }
    },
    GameRule: (buffer, offset) => {
      let { value: name, size: nameSize } = (ctx.string)(buffer, offset)
      let { value: type, size: typeSize } = ((buffer, offset) => {
        const { value, size } = (ctx.varint)(buffer, offset)
        return { value: {"1":"bool","2":"int","3":"float"}[value] || value, size }
      })(buffer, offset + nameSize)
      let { value: value1, size: value1Size } = ((buffer, offset) => {
        switch (type) {
          case "bool": return (ctx.bool)(buffer, offset)
          case "int": return (ctx.zigzag32)(buffer, offset)
          case "float": return (ctx.lf32)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + nameSize + typeSize)
      return { value: { name, type, value: value1 }, size: nameSize + typeSize + value1Size}
    },
    GameRules: (buffer, offset) => {
      const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
      if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
      const data = []
      let size = countSize
      for (let i = 0; i < count; i++) {
        const elem = (ctx.GameRule)(buffer, offset + size)
        data.push(elem.value)
        size += elem.size
      }
      return { value: data, size }
    },
    Blob: (buffer, offset) => {
      let { value: hash, size: hashSize } = (ctx.lu64)(buffer, offset)
      let { value: payload, size: payloadSize } = (ctx.ByteArray)(buffer, offset + hashSize)
      return { value: { hash, payload }, size: hashSize + payloadSize}
    },
    BlockPalette: (buffer, offset) => {
      const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
      if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
      const data = []
      let size = countSize
      for (let i = 0; i < count; i++) {
        const elem = ((buffer, offset) => {
        let { value: name1, size: name1Size } = (ctx.string)(buffer, offset)
        let { value: state, size: stateSize } = (ctx.nbt)(buffer, offset + name1Size)
        return { value: { name: name1, state }, size: name1Size + stateSize}
      })(buffer, offset + size)
        data.push(elem.value)
        size += elem.size
      }
      return { value: data, size }
    },
    Itemstates: (buffer, offset) => {
      const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
      if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
      const data = []
      let size = countSize
      for (let i = 0; i < count; i++) {
        const elem = ((buffer, offset) => {
        let { value: name1, size: name1Size } = (ctx.string)(buffer, offset)
        let { value: runtime_id, size: runtime_idSize } = (ctx.li16)(buffer, offset + name1Size)
        let { value: component_based, size: component_basedSize } = (ctx.bool)(buffer, offset + name1Size + runtime_idSize)
        return { value: { name: name1, runtime_id, component_based }, size: name1Size + runtime_idSize + component_basedSize}
      })(buffer, offset + size)
        data.push(elem.value)
        size += elem.size
      }
      return { value: data, size }
    },
    Item: (buffer, offset) => {
      let { value: network_id, size: network_idSize } = (ctx.zigzag32)(buffer, offset)
      let { value: auxiliary_value, size: auxiliary_valueSize } = ((buffer, offset) => {
        switch (network_id) {
          case 0: return (ctx.void)(buffer, offset)
          default: return (ctx.zigzag32)(buffer, offset)
        }
      })(buffer, offset + network_idSize)
      let { value: has_nbt, size: has_nbtSize } = ((buffer, offset) => {
        switch (network_id) {
          case 0: return (ctx.void)(buffer, offset)
          default: return ((buffer, offset) => {
            const { value, size } = (ctx.lu16)(buffer, offset)
            return { value: {"0":false,"65535":true}[value] || value, size }
          })(buffer, offset)
        }
      })(buffer, offset + network_idSize + auxiliary_valueSize)
      let { value: nbt, size: nbtSize } = ((buffer, offset) => {
        switch (network_id) {
          case 0: return (ctx.void)(buffer, offset)
          default: return ((buffer, offset) => {
            switch (has_nbt) {
              case true: return ((buffer, offset) => {
                let { value: version, size: versionSize } = (ctx.u8)(buffer, offset)
                let { value: nbt1, size: nbt1Size } = (ctx.nbt)(buffer, offset + versionSize)
                return { value: { version, nbt: nbt1 }, size: versionSize + nbt1Size}
              })(buffer, offset)
              default: return (ctx.void)(buffer, offset)
            }
          })(buffer, offset)
        }
      })(buffer, offset + network_idSize + auxiliary_valueSize + has_nbtSize)
      let { value: can_place_on, size: can_place_onSize } = ((buffer, offset) => {
        switch (network_id) {
          case 0: return (ctx.void)(buffer, offset)
          default: return ((buffer, offset) => {
            const { value: count, size: countSize } = (ctx.zigzag32)(buffer, offset)
            if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
            const data = []
            let size = countSize
            for (let i = 0; i < count; i++) {
              const elem = (ctx.string)(buffer, offset + size)
              data.push(elem.value)
              size += elem.size
            }
            return { value: data, size }
          })(buffer, offset)
        }
      })(buffer, offset + network_idSize + auxiliary_valueSize + has_nbtSize + nbtSize)
      let { value: can_destroy, size: can_destroySize } = ((buffer, offset) => {
        switch (network_id) {
          case 0: return (ctx.void)(buffer, offset)
          default: return ((buffer, offset) => {
            const { value: count, size: countSize } = (ctx.zigzag32)(buffer, offset)
            if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
            const data = []
            let size = countSize
            for (let i = 0; i < count; i++) {
              const elem = (ctx.string)(buffer, offset + size)
              data.push(elem.value)
              size += elem.size
            }
            return { value: data, size }
          })(buffer, offset)
        }
      })(buffer, offset + network_idSize + auxiliary_valueSize + has_nbtSize + nbtSize + can_place_onSize)
      let { value: blocking_tick, size: blocking_tickSize } = ((buffer, offset) => {
        switch (network_id) {
          case 355: return (ctx.zigzag64)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + network_idSize + auxiliary_valueSize + has_nbtSize + nbtSize + can_place_onSize + can_destroySize)
      return { value: { network_id, auxiliary_value, has_nbt, nbt, can_place_on, can_destroy, blocking_tick }, size: network_idSize + auxiliary_valueSize + has_nbtSize + nbtSize + can_place_onSize + can_destroySize + blocking_tickSize}
    },
    vec3i: (buffer, offset) => {
      let { value: x, size: xSize } = (ctx.zigzag32)(buffer, offset)
      let { value: y, size: ySize } = (ctx.zigzag32)(buffer, offset + xSize)
      let { value: z, size: zSize } = (ctx.zigzag32)(buffer, offset + xSize + ySize)
      return { value: { x, y, z }, size: xSize + ySize + zSize}
    },
    vec3u: (buffer, offset) => {
      let { value: x, size: xSize } = (ctx.varint)(buffer, offset)
      let { value: y, size: ySize } = (ctx.varint)(buffer, offset + xSize)
      let { value: z, size: zSize } = (ctx.varint)(buffer, offset + xSize + ySize)
      return { value: { x, y, z }, size: xSize + ySize + zSize}
    },
    vec3f: (buffer, offset) => {
      let { value: x, size: xSize } = (ctx.lf32)(buffer, offset)
      let { value: y, size: ySize } = (ctx.lf32)(buffer, offset + xSize)
      let { value: z, size: zSize } = (ctx.lf32)(buffer, offset + xSize + ySize)
      return { value: { x, y, z }, size: xSize + ySize + zSize}
    },
    vec2f: (buffer, offset) => {
      let { value: x, size: xSize } = (ctx.lf32)(buffer, offset)
      let { value: z, size: zSize } = (ctx.lf32)(buffer, offset + xSize)
      return { value: { x, z }, size: xSize + zSize}
    },
    MetadataDictionary: (buffer, offset) => {
      const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
      if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
      const data = []
      let size = countSize
      for (let i = 0; i < count; i++) {
        const elem = ((buffer, offset) => {
        let { value: key, size: keySize } = ((buffer, offset) => {
          const { value, size } = (ctx.varint)(buffer, offset)
          return { value: {"0":"index","1":"health","2":"variant","3":"color","4":"nametag","5":"owner_eid","6":"target_eid","7":"air","8":"potion_color","9":"potion_ambient","10":"jump_duration","11":"hurt_time","12":"hurt_direction","13":"paddle_time_left","14":"paddle_time_right","15":"experience_value","16":"minecart_display_block","17":"minecart_display_offset","18":"minecart_has_display","20":"old_swell","21":"swell_dir","22":"charge_amount","23":"enderman_held_runtime_id","24":"entity_age","26":"player_flags","27":"player_index","28":"player_bed_position","29":"fireball_power_x","30":"fireball_power_y","31":"fireball_power_z","32":"aux_power","33":"fish_x","34":"fish_z","35":"fish_angle","36":"potion_aux_value","37":"lead_holder_eid","38":"scale","39":"interactive_tag","40":"npc_skin_id","41":"url_tag","42":"max_airdata_max_air","43":"mark_variant","44":"container_type","45":"container_base_size","46":"container_extra_slots_per_strength","47":"block_target","48":"wither_invulnerable_ticks","49":"wither_target_1","50":"wither_target_2","51":"wither_target_3","52":"aerial_attack","53":"boundingbox_width","54":"boundingbox_height","55":"fuse_length","56":"rider_seat_position","57":"rider_rotation_locked","58":"rider_max_rotation","59":"rider_min_rotation","60":"area_effect_cloud_radius","61":"area_effect_cloud_waiting","62":"area_effect_cloud_particle_id","63":"shulker_peek_id","64":"shulker_attach_face","65":"shulker_attached","66":"shulker_attach_pos","67":"trading_player_eid","68":"trading_career","69":"has_command_block","70":"command_block_command","71":"command_block_last_output","72":"command_block_track_output","73":"controlling_rider_seat_number","74":"strength","75":"max_strength","76":"spell_casting_color","77":"limited_life","78":"armor_stand_pose_index","79":"ender_crystal_time_offset","80":"always_show_nametag","81":"color_2","82":"name_author","83":"score_tag","84":"balloon_attached_entity","85":"pufferfish_size","86":"bubble_time","87":"agent","88":"sitting_amount","89":"sitting_amount_previous","90":"eating_counter","91":"flags_extended","92":"laying_amount","93":"laying_amount_previous","94":"duration","95":"spawn_time","96":"change_rate","97":"change_on_pickup","98":"pickup_count","99":"interact_text","100":"trade_tier","101":"max_trade_tier","102":"trade_experience","103":"skin_id","104":"spawning_frames","105":"command_block_tick_delay","106":"command_block_execute_on_first_tick","107":"ambient_sound_interval","108":"ambient_sound_interval_range","109":"ambient_sound_event_name","110":"fall_damage_multiplier","111":"name_raw_text","112":"can_ride_target","113":"low_tier_cured_discount","114":"high_tier_cured_discount","115":"nearby_cured_discount","116":"nearby_cured_discount_timestamp","117":"hitbox","118":"is_buoyant","119":"buoyancy_data"}[value] || value, size }
        })(buffer, offset)
        let { value: type1, size: type1Size } = ((buffer, offset) => {
          const { value, size } = (ctx.varint)(buffer, offset)
          return { value: {"0":"byte","1":"short","2":"int","3":"float","4":"string","5":"compound","6":"vec3i","7":"long","8":"vec3f"}[value] || value, size }
        })(buffer, offset + keySize)
        let { value: value2, size: value2Size } = ((buffer, offset) => {
          switch (type1) {
            case "byte": return (ctx.i8)(buffer, offset)
            case "short": return (ctx.li16)(buffer, offset)
            case "int": return (ctx.zigzag32)(buffer, offset)
            case "float": return (ctx.lf32)(buffer, offset)
            case "string": return (ctx.string)(buffer, offset)
            case "compound": return (ctx.nbt)(buffer, offset)
            case "vec3i": return (ctx.vec3i)(buffer, offset)
            case "long": return (ctx.zigzag64)(buffer, offset)
            case "vec3f": return (ctx.vec3f)(buffer, offset)
            default: return (ctx.void)(buffer, offset)
          }
        })(buffer, offset + keySize + type1Size)
        return { value: { key, type: type1, value: value2 }, size: keySize + type1Size + value2Size}
      })(buffer, offset + size)
        data.push(elem.value)
        size += elem.size
      }
      return { value: data, size }
    },
    Link: (buffer, offset) => {
      let { value: ridden_entity_id, size: ridden_entity_idSize } = (ctx.zigzag64)(buffer, offset)
      let { value: rider_entity_id, size: rider_entity_idSize } = (ctx.zigzag64)(buffer, offset + ridden_entity_idSize)
      let { value: type, size: typeSize } = (ctx.u8)(buffer, offset + ridden_entity_idSize + rider_entity_idSize)
      let { value: immediate, size: immediateSize } = (ctx.bool)(buffer, offset + ridden_entity_idSize + rider_entity_idSize + typeSize)
      let { value: rider_initiated, size: rider_initiatedSize } = (ctx.bool)(buffer, offset + ridden_entity_idSize + rider_entity_idSize + typeSize + immediateSize)
      return { value: { ridden_entity_id, rider_entity_id, type, immediate, rider_initiated }, size: ridden_entity_idSize + rider_entity_idSize + typeSize + immediateSize + rider_initiatedSize}
    },
    Links: (buffer, offset) => {
      const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
      if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
      const data = []
      let size = countSize
      for (let i = 0; i < count; i++) {
        const elem = (ctx.Link)(buffer, offset + size)
        data.push(elem.value)
        size += elem.size
      }
      return { value: data, size }
    },
    EntityAttributes: (buffer, offset) => {
      const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
      if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
      const data = []
      let size = countSize
      for (let i = 0; i < count; i++) {
        const elem = ((buffer, offset) => {
        let { value: name1, size: name1Size } = (ctx.string)(buffer, offset)
        let { value: min, size: minSize } = (ctx.lf32)(buffer, offset + name1Size)
        let { value: value2, size: value2Size } = (ctx.lf32)(buffer, offset + name1Size + minSize)
        let { value: max, size: maxSize } = (ctx.lf32)(buffer, offset + name1Size + minSize + value2Size)
        return { value: { name: name1, min, value: value2, max }, size: name1Size + minSize + value2Size + maxSize}
      })(buffer, offset + size)
        data.push(elem.value)
        size += elem.size
      }
      return { value: data, size }
    },
    Rotation: (buffer, offset) => {
      let { value: yaw, size: yawSize } = (ctx.byterot)(buffer, offset)
      let { value: pitch, size: pitchSize } = (ctx.byterot)(buffer, offset + yawSize)
      let { value: head_yaw, size: head_yawSize } = (ctx.byterot)(buffer, offset + yawSize + pitchSize)
      return { value: { yaw, pitch, head_yaw }, size: yawSize + pitchSize + head_yawSize}
    },
    BlockCoordinates: (buffer, offset) => {
      let { value: x, size: xSize } = (ctx.zigzag32)(buffer, offset)
      let { value: y, size: ySize } = (ctx.varint)(buffer, offset + xSize)
      let { value: z, size: zSize } = (ctx.zigzag32)(buffer, offset + xSize + ySize)
      return { value: { x, y, z }, size: xSize + ySize + zSize}
    },
    PlayerAttributes: (buffer, offset) => {
      const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
      if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
      const data = []
      let size = countSize
      for (let i = 0; i < count; i++) {
        const elem = ((buffer, offset) => {
        let { value: min, size: minSize } = (ctx.lf32)(buffer, offset)
        let { value: max, size: maxSize } = (ctx.lf32)(buffer, offset + minSize)
        let { value: current, size: currentSize } = (ctx.lf32)(buffer, offset + minSize + maxSize)
        let { value: default1, size: default1Size } = (ctx.lf32)(buffer, offset + minSize + maxSize + currentSize)
        let { value: name1, size: name1Size } = (ctx.string)(buffer, offset + minSize + maxSize + currentSize + default1Size)
        return { value: { min, max, current, default: default1, name: name1 }, size: minSize + maxSize + currentSize + default1Size + name1Size}
      })(buffer, offset + size)
        data.push(elem.value)
        size += elem.size
      }
      return { value: data, size }
    },
    Transaction: (buffer, offset) => {
      let { value: legacy_request_id, size: legacy_request_idSize } = (ctx.zigzag32)(buffer, offset)
      let { value: legacy_transactions, size: legacy_transactionsSize } = ((buffer, offset) => {
        switch (legacy_request_id) {
          case 0: return (ctx.void)(buffer, offset)
          default: return ((buffer, offset) => {
            const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
            if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
            const data = []
            let size = countSize
            for (let i = 0; i < count; i++) {
              const elem = ((buffer, offset) => {
              let { value: container_id, size: container_idSize } = (ctx.u8)(buffer, offset)
              let { value: changed_slots, size: changed_slotsSize } = ((buffer, offset) => {
                const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
                if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
                const data = []
                let size = countSize
                for (let i = 0; i < count; i++) {
                  const elem = ((buffer, offset) => {
                  let { value: slot_id, size: slot_idSize } = (ctx.u8)(buffer, offset)
                  return { value: { slot_id }, size: slot_idSize}
                })(buffer, offset + size)
                  data.push(elem.value)
                  size += elem.size
                }
                return { value: data, size }
              })(buffer, offset + container_idSize)
              return { value: { container_id, changed_slots }, size: container_idSize + changed_slotsSize}
            })(buffer, offset + size)
              data.push(elem.value)
              size += elem.size
            }
            return { value: data, size }
          })(buffer, offset)
        }
      })(buffer, offset + legacy_request_idSize)
      let { value: transaction_type, size: transaction_typeSize } = ((buffer, offset) => {
        const { value, size } = (ctx.varint)(buffer, offset)
        return { value: {"0":"normal","1":"inventory_mismatch","2":"item_use","3":"item_use_on_entity","4":"item_release"}[value] || value, size }
      })(buffer, offset + legacy_request_idSize + legacy_transactionsSize)
      let { value: network_ids, size: network_idsSize } = (ctx.bool)(buffer, offset + legacy_request_idSize + legacy_transactionsSize + transaction_typeSize)
      let { value: inventory_actions, size: inventory_actionsSize } = ((buffer, offset) => {
        const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = ((buffer, offset) => {
          let { value: source_type, size: source_typeSize } = ((buffer, offset) => {
            const { value, size } = (ctx.varint)(buffer, offset)
            return { value: {"0":"container","1":"global","2":"world_interaction","3":"creative","100":"craft_slot","99999":"craft"}[value] || value, size }
          })(buffer, offset)
          let { value: inventory_id, size: inventory_idSize } = ((buffer, offset) => {
            switch (source_type) {
              case "container": return (ctx.varint)(buffer, offset)
              case "creative": return (ctx.varint)(buffer, offset)
              default: return (ctx.void)(buffer, offset)
            }
          })(buffer, offset + source_typeSize)
          let { value: flags, size: flagsSize } = ((buffer, offset) => {
            switch (source_type) {
              case "world_interaction": return (ctx.varint)(buffer, offset)
              default: return (ctx.void)(buffer, offset)
            }
          })(buffer, offset + source_typeSize + inventory_idSize)
          let { value: action, size: actionSize } = ((buffer, offset) => {
            switch (source_type) {
              case "craft": return (ctx.varint)(buffer, offset)
              case "craft_slot": return (ctx.varint)(buffer, offset)
              default: return (ctx.void)(buffer, offset)
            }
          })(buffer, offset + source_typeSize + inventory_idSize + flagsSize)
          let { value: slot, size: slotSize } = (ctx.varint)(buffer, offset + source_typeSize + inventory_idSize + flagsSize + actionSize)
          let { value: old_item, size: old_itemSize } = (ctx.Item)(buffer, offset + source_typeSize + inventory_idSize + flagsSize + actionSize + slotSize)
          let { value: new_item, size: new_itemSize } = (ctx.Item)(buffer, offset + source_typeSize + inventory_idSize + flagsSize + actionSize + slotSize + old_itemSize)
          let { value: new_item_stack_id, size: new_item_stack_idSize } = ((buffer, offset) => {
            switch (network_ids) {
              case true: return (ctx.zigzag32)(buffer, offset)
              default: return (ctx.void)(buffer, offset)
            }
          })(buffer, offset + source_typeSize + inventory_idSize + flagsSize + actionSize + slotSize + old_itemSize + new_itemSize)
          return { value: { source_type, inventory_id, flags, action, slot, old_item, new_item, new_item_stack_id }, size: source_typeSize + inventory_idSize + flagsSize + actionSize + slotSize + old_itemSize + new_itemSize + new_item_stack_idSize}
        })(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset + legacy_request_idSize + legacy_transactionsSize + transaction_typeSize + network_idsSize)
      let { value: transaction_data, size: transaction_dataSize } = ((buffer, offset) => {
        switch (transaction_type) {
          case "normal": return (ctx.void)(buffer, offset)
          case "inventory_mismatch": return (ctx.void)(buffer, offset)
          case "item_use": return ((buffer, offset) => {
            let { value: action_type, size: action_typeSize } = ((buffer, offset) => {
              const { value, size } = (ctx.varint)(buffer, offset)
              return { value: {"0":"click_block","1":"click_air","2":"break_block"}[value] || value, size }
            })(buffer, offset)
            let { value: block_position, size: block_positionSize } = (ctx.BlockCoordinates)(buffer, offset + action_typeSize)
            let { value: face, size: faceSize } = (ctx.varint)(buffer, offset + action_typeSize + block_positionSize)
            let { value: hotbar_slot, size: hotbar_slotSize } = (ctx.varint)(buffer, offset + action_typeSize + block_positionSize + faceSize)
            let { value: held_item, size: held_itemSize } = (ctx.Item)(buffer, offset + action_typeSize + block_positionSize + faceSize + hotbar_slotSize)
            let { value: player_pos, size: player_posSize } = (ctx.vec3f)(buffer, offset + action_typeSize + block_positionSize + faceSize + hotbar_slotSize + held_itemSize)
            let { value: click_pos, size: click_posSize } = (ctx.vec3f)(buffer, offset + action_typeSize + block_positionSize + faceSize + hotbar_slotSize + held_itemSize + player_posSize)
            let { value: block_runtime_id, size: block_runtime_idSize } = (ctx.varint)(buffer, offset + action_typeSize + block_positionSize + faceSize + hotbar_slotSize + held_itemSize + player_posSize + click_posSize)
            return { value: { action_type, block_position, face, hotbar_slot, held_item, player_pos, click_pos, block_runtime_id }, size: action_typeSize + block_positionSize + faceSize + hotbar_slotSize + held_itemSize + player_posSize + click_posSize + block_runtime_idSize}
          })(buffer, offset)
          case "item_use_on_entity": return ((buffer, offset) => {
            let { value: entity_runtime_id, size: entity_runtime_idSize } = (ctx.varint64)(buffer, offset)
            let { value: action_type, size: action_typeSize } = ((buffer, offset) => {
              const { value, size } = (ctx.varint)(buffer, offset)
              return { value: {"0":"interact","1":"attack"}[value] || value, size }
            })(buffer, offset + entity_runtime_idSize)
            let { value: hotbar_slot, size: hotbar_slotSize } = (ctx.zigzag32)(buffer, offset + entity_runtime_idSize + action_typeSize)
            let { value: held_item, size: held_itemSize } = (ctx.Item)(buffer, offset + entity_runtime_idSize + action_typeSize + hotbar_slotSize)
            let { value: player_pos, size: player_posSize } = (ctx.vec3f)(buffer, offset + entity_runtime_idSize + action_typeSize + hotbar_slotSize + held_itemSize)
            let { value: click_pos, size: click_posSize } = (ctx.vec3f)(buffer, offset + entity_runtime_idSize + action_typeSize + hotbar_slotSize + held_itemSize + player_posSize)
            return { value: { entity_runtime_id, action_type, hotbar_slot, held_item, player_pos, click_pos }, size: entity_runtime_idSize + action_typeSize + hotbar_slotSize + held_itemSize + player_posSize + click_posSize}
          })(buffer, offset)
          case "item_release": return ((buffer, offset) => {
            let { value: action_type, size: action_typeSize } = ((buffer, offset) => {
              const { value, size } = (ctx.varint)(buffer, offset)
              return { value: {"0":"release","1":"consume"}[value] || value, size }
            })(buffer, offset)
            let { value: hotbar_slot, size: hotbar_slotSize } = (ctx.zigzag32)(buffer, offset + action_typeSize)
            let { value: held_item, size: held_itemSize } = (ctx.Item)(buffer, offset + action_typeSize + hotbar_slotSize)
            let { value: head_pos, size: head_posSize } = (ctx.vec3f)(buffer, offset + action_typeSize + hotbar_slotSize + held_itemSize)
            return { value: { action_type, hotbar_slot, held_item, head_pos }, size: action_typeSize + hotbar_slotSize + held_itemSize + head_posSize}
          })(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + legacy_request_idSize + legacy_transactionsSize + transaction_typeSize + network_idsSize + inventory_actionsSize)
      return { value: { legacy_request_id, legacy_transactions, transaction_type, network_ids, inventory_actions, transaction_data }, size: legacy_request_idSize + legacy_transactionsSize + transaction_typeSize + network_idsSize + inventory_actionsSize + transaction_dataSize}
    },
    ItemStack: (buffer, offset) => {
      let { value: runtime_id, size: runtime_idSize } = (ctx.zigzag32)(buffer, offset)
      let { value: item, size: itemSize } = (ctx.Item)(buffer, offset + runtime_idSize)
      return { value: { runtime_id, item }, size: runtime_idSize + itemSize}
    },
    ItemStacks: (buffer, offset) => {
      const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
      if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
      const data = []
      let size = countSize
      for (let i = 0; i < count; i++) {
        const elem = (ctx.ItemStack)(buffer, offset + size)
        data.push(elem.value)
        size += elem.size
      }
      return { value: data, size }
    },
    RecipeIngredient: (buffer, offset) => {
      let { value: network_id, size: network_idSize } = (ctx.zigzag32)(buffer, offset)
      let { value: network_data, size: network_dataSize } = ((buffer, offset) => {
        switch (network_id) {
          case 0: return (ctx.void)(buffer, offset)
          default: return (ctx.zigzag32)(buffer, offset)
        }
      })(buffer, offset + network_idSize)
      let { value: count, size: countSize } = ((buffer, offset) => {
        switch (network_id) {
          case 0: return (ctx.void)(buffer, offset)
          default: return (ctx.zigzag32)(buffer, offset)
        }
      })(buffer, offset + network_idSize + network_dataSize)
      return { value: { network_id, network_data, count }, size: network_idSize + network_dataSize + countSize}
    },
    PotionTypeRecipes: (buffer, offset) => {
      const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
      if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
      const data = []
      let size = countSize
      for (let i = 0; i < count; i++) {
        const elem = ((buffer, offset) => {
        let { value: input_item_id, size: input_item_idSize } = (ctx.zigzag32)(buffer, offset)
        let { value: input_item_meta, size: input_item_metaSize } = (ctx.zigzag32)(buffer, offset + input_item_idSize)
        let { value: ingredient_id, size: ingredient_idSize } = (ctx.zigzag32)(buffer, offset + input_item_idSize + input_item_metaSize)
        let { value: ingredient_meta, size: ingredient_metaSize } = (ctx.zigzag32)(buffer, offset + input_item_idSize + input_item_metaSize + ingredient_idSize)
        let { value: output_item_id, size: output_item_idSize } = (ctx.zigzag32)(buffer, offset + input_item_idSize + input_item_metaSize + ingredient_idSize + ingredient_metaSize)
        let { value: output_item_meta, size: output_item_metaSize } = (ctx.zigzag32)(buffer, offset + input_item_idSize + input_item_metaSize + ingredient_idSize + ingredient_metaSize + output_item_idSize)
        return { value: { input_item_id, input_item_meta, ingredient_id, ingredient_meta, output_item_id, output_item_meta }, size: input_item_idSize + input_item_metaSize + ingredient_idSize + ingredient_metaSize + output_item_idSize + output_item_metaSize}
      })(buffer, offset + size)
        data.push(elem.value)
        size += elem.size
      }
      return { value: data, size }
    },
    PotionContainerChangeRecipes: (buffer, offset) => {
      const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
      if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
      const data = []
      let size = countSize
      for (let i = 0; i < count; i++) {
        const elem = ((buffer, offset) => {
        let { value: input_item_id, size: input_item_idSize } = (ctx.zigzag32)(buffer, offset)
        let { value: ingredient_id, size: ingredient_idSize } = (ctx.zigzag32)(buffer, offset + input_item_idSize)
        let { value: output_item_id, size: output_item_idSize } = (ctx.zigzag32)(buffer, offset + input_item_idSize + ingredient_idSize)
        return { value: { input_item_id, ingredient_id, output_item_id }, size: input_item_idSize + ingredient_idSize + output_item_idSize}
      })(buffer, offset + size)
        data.push(elem.value)
        size += elem.size
      }
      return { value: data, size }
    },
    Recipes: (buffer, offset) => {
      const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
      if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
      const data = []
      let size = countSize
      for (let i = 0; i < count; i++) {
        const elem = ((buffer, offset) => {
        let { value: type1, size: type1Size } = ((buffer, offset) => {
          const { value, size } = (ctx.zigzag32)(buffer, offset)
          return { value: {"0":"shapeless","1":"shaped","2":"furnace","3":"furnace_with_metadata","4":"multi","5":"shulker_box","6":"shapeless_chemistry","7":"shaped_chemistry"}[value] || value, size }
        })(buffer, offset)
        let { value: recipe, size: recipeSize } = ((buffer, offset) => {
          switch (type1) {
            case "shapeless": return ((buffer, offset) => {
              let { value: recipe_id, size: recipe_idSize } = (ctx.string)(buffer, offset)
              let { value: input, size: inputSize } = ((buffer, offset) => {
                const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
                if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
                const data = []
                let size = countSize
                for (let i = 0; i < count; i++) {
                  const elem = (ctx.RecipeIngredient)(buffer, offset + size)
                  data.push(elem.value)
                  size += elem.size
                }
                return { value: data, size }
              })(buffer, offset + recipe_idSize)
              let { value: output, size: outputSize } = ((buffer, offset) => {
                const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
                if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
                const data = []
                let size = countSize
                for (let i = 0; i < count; i++) {
                  const elem = (ctx.Item)(buffer, offset + size)
                  data.push(elem.value)
                  size += elem.size
                }
                return { value: data, size }
              })(buffer, offset + recipe_idSize + inputSize)
              let { value: uuid, size: uuidSize } = (ctx.uuid)(buffer, offset + recipe_idSize + inputSize + outputSize)
              let { value: block, size: blockSize } = (ctx.string)(buffer, offset + recipe_idSize + inputSize + outputSize + uuidSize)
              let { value: priority, size: prioritySize } = (ctx.zigzag32)(buffer, offset + recipe_idSize + inputSize + outputSize + uuidSize + blockSize)
              let { value: network_id1, size: network_id1Size } = (ctx.zigzag32)(buffer, offset + recipe_idSize + inputSize + outputSize + uuidSize + blockSize + prioritySize)
              return { value: { recipe_id, input, output, uuid, block, priority, network_id: network_id1 }, size: recipe_idSize + inputSize + outputSize + uuidSize + blockSize + prioritySize + network_id1Size}
            })(buffer, offset)
            case "shulker_box": return ((buffer, offset) => {
              let { value: recipe_id, size: recipe_idSize } = (ctx.string)(buffer, offset)
              let { value: input, size: inputSize } = ((buffer, offset) => {
                const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
                if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
                const data = []
                let size = countSize
                for (let i = 0; i < count; i++) {
                  const elem = (ctx.RecipeIngredient)(buffer, offset + size)
                  data.push(elem.value)
                  size += elem.size
                }
                return { value: data, size }
              })(buffer, offset + recipe_idSize)
              let { value: output, size: outputSize } = ((buffer, offset) => {
                const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
                if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
                const data = []
                let size = countSize
                for (let i = 0; i < count; i++) {
                  const elem = (ctx.Item)(buffer, offset + size)
                  data.push(elem.value)
                  size += elem.size
                }
                return { value: data, size }
              })(buffer, offset + recipe_idSize + inputSize)
              let { value: uuid, size: uuidSize } = (ctx.uuid)(buffer, offset + recipe_idSize + inputSize + outputSize)
              let { value: block, size: blockSize } = (ctx.string)(buffer, offset + recipe_idSize + inputSize + outputSize + uuidSize)
              let { value: priority, size: prioritySize } = (ctx.zigzag32)(buffer, offset + recipe_idSize + inputSize + outputSize + uuidSize + blockSize)
              let { value: network_id1, size: network_id1Size } = (ctx.zigzag32)(buffer, offset + recipe_idSize + inputSize + outputSize + uuidSize + blockSize + prioritySize)
              return { value: { recipe_id, input, output, uuid, block, priority, network_id: network_id1 }, size: recipe_idSize + inputSize + outputSize + uuidSize + blockSize + prioritySize + network_id1Size}
            })(buffer, offset)
            case "shapeless_chemistry": return ((buffer, offset) => {
              let { value: recipe_id, size: recipe_idSize } = (ctx.string)(buffer, offset)
              let { value: input, size: inputSize } = ((buffer, offset) => {
                const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
                if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
                const data = []
                let size = countSize
                for (let i = 0; i < count; i++) {
                  const elem = (ctx.RecipeIngredient)(buffer, offset + size)
                  data.push(elem.value)
                  size += elem.size
                }
                return { value: data, size }
              })(buffer, offset + recipe_idSize)
              let { value: output, size: outputSize } = ((buffer, offset) => {
                const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
                if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
                const data = []
                let size = countSize
                for (let i = 0; i < count; i++) {
                  const elem = (ctx.Item)(buffer, offset + size)
                  data.push(elem.value)
                  size += elem.size
                }
                return { value: data, size }
              })(buffer, offset + recipe_idSize + inputSize)
              let { value: uuid, size: uuidSize } = (ctx.uuid)(buffer, offset + recipe_idSize + inputSize + outputSize)
              let { value: block, size: blockSize } = (ctx.string)(buffer, offset + recipe_idSize + inputSize + outputSize + uuidSize)
              let { value: priority, size: prioritySize } = (ctx.zigzag32)(buffer, offset + recipe_idSize + inputSize + outputSize + uuidSize + blockSize)
              let { value: network_id1, size: network_id1Size } = (ctx.zigzag32)(buffer, offset + recipe_idSize + inputSize + outputSize + uuidSize + blockSize + prioritySize)
              return { value: { recipe_id, input, output, uuid, block, priority, network_id: network_id1 }, size: recipe_idSize + inputSize + outputSize + uuidSize + blockSize + prioritySize + network_id1Size}
            })(buffer, offset)
            case "shaped": return ((buffer, offset) => {
              let { value: recipe_id, size: recipe_idSize } = (ctx.string)(buffer, offset)
              let { value: width, size: widthSize } = (ctx.zigzag32)(buffer, offset + recipe_idSize)
              let { value: height, size: heightSize } = (ctx.zigzag32)(buffer, offset + recipe_idSize + widthSize)
              let { value: input, size: inputSize } = ((buffer, offset) => {
                const count = width
                const countSize = 0
                if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
                const data = []
                let size = countSize
                for (let i = 0; i < count; i++) {
                  const elem = ((buffer, offset) => {
                  const count = height
                  const countSize = 0
                  if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
                  const data = []
                  let size = countSize
                  for (let i = 0; i < count; i++) {
                    const elem = (ctx.RecipeIngredient)(buffer, offset + size)
                    data.push(elem.value)
                    size += elem.size
                  }
                  return { value: data, size }
                })(buffer, offset + size)
                  data.push(elem.value)
                  size += elem.size
                }
                return { value: data, size }
              })(buffer, offset + recipe_idSize + widthSize + heightSize)
              let { value: output, size: outputSize } = ((buffer, offset) => {
                const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
                if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
                const data = []
                let size = countSize
                for (let i = 0; i < count; i++) {
                  const elem = (ctx.Item)(buffer, offset + size)
                  data.push(elem.value)
                  size += elem.size
                }
                return { value: data, size }
              })(buffer, offset + recipe_idSize + widthSize + heightSize + inputSize)
              let { value: uuid, size: uuidSize } = (ctx.uuid)(buffer, offset + recipe_idSize + widthSize + heightSize + inputSize + outputSize)
              let { value: block, size: blockSize } = (ctx.string)(buffer, offset + recipe_idSize + widthSize + heightSize + inputSize + outputSize + uuidSize)
              let { value: priority, size: prioritySize } = (ctx.zigzag32)(buffer, offset + recipe_idSize + widthSize + heightSize + inputSize + outputSize + uuidSize + blockSize)
              let { value: network_id1, size: network_id1Size } = (ctx.zigzag32)(buffer, offset + recipe_idSize + widthSize + heightSize + inputSize + outputSize + uuidSize + blockSize + prioritySize)
              return { value: { recipe_id, width, height, input, output, uuid, block, priority, network_id: network_id1 }, size: recipe_idSize + widthSize + heightSize + inputSize + outputSize + uuidSize + blockSize + prioritySize + network_id1Size}
            })(buffer, offset)
            case "shaped_chemistry": return ((buffer, offset) => {
              let { value: recipe_id, size: recipe_idSize } = (ctx.string)(buffer, offset)
              let { value: width, size: widthSize } = (ctx.zigzag32)(buffer, offset + recipe_idSize)
              let { value: height, size: heightSize } = (ctx.zigzag32)(buffer, offset + recipe_idSize + widthSize)
              let { value: input, size: inputSize } = ((buffer, offset) => {
                const count = width
                const countSize = 0
                if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
                const data = []
                let size = countSize
                for (let i = 0; i < count; i++) {
                  const elem = ((buffer, offset) => {
                  const count = height
                  const countSize = 0
                  if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
                  const data = []
                  let size = countSize
                  for (let i = 0; i < count; i++) {
                    const elem = (ctx.RecipeIngredient)(buffer, offset + size)
                    data.push(elem.value)
                    size += elem.size
                  }
                  return { value: data, size }
                })(buffer, offset + size)
                  data.push(elem.value)
                  size += elem.size
                }
                return { value: data, size }
              })(buffer, offset + recipe_idSize + widthSize + heightSize)
              let { value: output, size: outputSize } = ((buffer, offset) => {
                const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
                if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
                const data = []
                let size = countSize
                for (let i = 0; i < count; i++) {
                  const elem = (ctx.Item)(buffer, offset + size)
                  data.push(elem.value)
                  size += elem.size
                }
                return { value: data, size }
              })(buffer, offset + recipe_idSize + widthSize + heightSize + inputSize)
              let { value: uuid, size: uuidSize } = (ctx.uuid)(buffer, offset + recipe_idSize + widthSize + heightSize + inputSize + outputSize)
              let { value: block, size: blockSize } = (ctx.string)(buffer, offset + recipe_idSize + widthSize + heightSize + inputSize + outputSize + uuidSize)
              let { value: priority, size: prioritySize } = (ctx.zigzag32)(buffer, offset + recipe_idSize + widthSize + heightSize + inputSize + outputSize + uuidSize + blockSize)
              let { value: network_id1, size: network_id1Size } = (ctx.zigzag32)(buffer, offset + recipe_idSize + widthSize + heightSize + inputSize + outputSize + uuidSize + blockSize + prioritySize)
              return { value: { recipe_id, width, height, input, output, uuid, block, priority, network_id: network_id1 }, size: recipe_idSize + widthSize + heightSize + inputSize + outputSize + uuidSize + blockSize + prioritySize + network_id1Size}
            })(buffer, offset)
            case "furnace": return ((buffer, offset) => {
              let { value: input_id, size: input_idSize } = (ctx.zigzag32)(buffer, offset)
              let { value: output, size: outputSize } = (ctx.Item)(buffer, offset + input_idSize)
              let { value: block, size: blockSize } = (ctx.string)(buffer, offset + input_idSize + outputSize)
              return { value: { input_id, output, block }, size: input_idSize + outputSize + blockSize}
            })(buffer, offset)
            case "furnace_with_metadata": return ((buffer, offset) => {
              let { value: input_id, size: input_idSize } = (ctx.zigzag32)(buffer, offset)
              let { value: input_meta, size: input_metaSize } = (ctx.zigzag32)(buffer, offset + input_idSize)
              let { value: output, size: outputSize } = (ctx.Item)(buffer, offset + input_idSize + input_metaSize)
              let { value: block, size: blockSize } = (ctx.string)(buffer, offset + input_idSize + input_metaSize + outputSize)
              return { value: { input_id, input_meta, output, block }, size: input_idSize + input_metaSize + outputSize + blockSize}
            })(buffer, offset)
            case "multi": return ((buffer, offset) => {
              let { value: uuid, size: uuidSize } = (ctx.uuid)(buffer, offset)
              let { value: network_id1, size: network_id1Size } = (ctx.zigzag32)(buffer, offset + uuidSize)
              return { value: { uuid, network_id: network_id1 }, size: uuidSize + network_id1Size}
            })(buffer, offset)
            default: return (ctx.void)(buffer, offset)
          }
        })(buffer, offset + type1Size)
        return { value: { type: type1, recipe }, size: type1Size + recipeSize}
      })(buffer, offset + size)
        data.push(elem.value)
        size += elem.size
      }
      return { value: data, size }
    },
    SkinImage: (buffer, offset) => {
      let { value: width, size: widthSize } = (ctx.li32)(buffer, offset)
      let { value: height, size: heightSize } = (ctx.li32)(buffer, offset + widthSize)
      let { value: data, size: dataSize } = (ctx.string)(buffer, offset + widthSize + heightSize)
      return { value: { width, height, data }, size: widthSize + heightSize + dataSize}
    },
    Skin: (buffer, offset) => {
      let { value: skin_id, size: skin_idSize } = (ctx.string)(buffer, offset)
      let { value: skin_resource_pack, size: skin_resource_packSize } = (ctx.string)(buffer, offset + skin_idSize)
      let { value: skin_data, size: skin_dataSize } = (ctx.SkinImage)(buffer, offset + skin_idSize + skin_resource_packSize)
      let { value: animations, size: animationsSize } = ((buffer, offset) => {
        const { value: count, size: countSize } = (ctx.li32)(buffer, offset)
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = ((buffer, offset) => {
          let { value: skin_image, size: skin_imageSize } = (ctx.SkinImage)(buffer, offset)
          let { value: animation_type, size: animation_typeSize } = (ctx.li32)(buffer, offset + skin_imageSize)
          let { value: animation_frames, size: animation_framesSize } = (ctx.lf32)(buffer, offset + skin_imageSize + animation_typeSize)
          let { value: expression_type, size: expression_typeSize } = (ctx.lf32)(buffer, offset + skin_imageSize + animation_typeSize + animation_framesSize)
          return { value: { skin_image, animation_type, animation_frames, expression_type }, size: skin_imageSize + animation_typeSize + animation_framesSize + expression_typeSize}
        })(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset + skin_idSize + skin_resource_packSize + skin_dataSize)
      let { value: cape_data, size: cape_dataSize } = (ctx.SkinImage)(buffer, offset + skin_idSize + skin_resource_packSize + skin_dataSize + animationsSize)
      let { value: geometry_data, size: geometry_dataSize } = (ctx.string)(buffer, offset + skin_idSize + skin_resource_packSize + skin_dataSize + animationsSize + cape_dataSize)
      let { value: animation_data, size: animation_dataSize } = (ctx.string)(buffer, offset + skin_idSize + skin_resource_packSize + skin_dataSize + animationsSize + cape_dataSize + geometry_dataSize)
      let { value: premium, size: premiumSize } = (ctx.string)(buffer, offset + skin_idSize + skin_resource_packSize + skin_dataSize + animationsSize + cape_dataSize + geometry_dataSize + animation_dataSize)
      let { value: persona, size: personaSize } = (ctx.bool)(buffer, offset + skin_idSize + skin_resource_packSize + skin_dataSize + animationsSize + cape_dataSize + geometry_dataSize + animation_dataSize + premiumSize)
      let { value: cape_on_classic, size: cape_on_classicSize } = (ctx.bool)(buffer, offset + skin_idSize + skin_resource_packSize + skin_dataSize + animationsSize + cape_dataSize + geometry_dataSize + animation_dataSize + premiumSize + personaSize)
      let { value: cape_id, size: cape_idSize } = (ctx.string)(buffer, offset + skin_idSize + skin_resource_packSize + skin_dataSize + animationsSize + cape_dataSize + geometry_dataSize + animation_dataSize + premiumSize + personaSize + cape_on_classicSize)
      let { value: full_skin_id, size: full_skin_idSize } = (ctx.string)(buffer, offset + skin_idSize + skin_resource_packSize + skin_dataSize + animationsSize + cape_dataSize + geometry_dataSize + animation_dataSize + premiumSize + personaSize + cape_on_classicSize + cape_idSize)
      let { value: arm_size, size: arm_sizeSize } = (ctx.string)(buffer, offset + skin_idSize + skin_resource_packSize + skin_dataSize + animationsSize + cape_dataSize + geometry_dataSize + animation_dataSize + premiumSize + personaSize + cape_on_classicSize + cape_idSize + full_skin_idSize)
      let { value: skin_color, size: skin_colorSize } = (ctx.string)(buffer, offset + skin_idSize + skin_resource_packSize + skin_dataSize + animationsSize + cape_dataSize + geometry_dataSize + animation_dataSize + premiumSize + personaSize + cape_on_classicSize + cape_idSize + full_skin_idSize + arm_sizeSize)
      let { value: personal_pieces, size: personal_piecesSize } = ((buffer, offset) => {
        const { value: count, size: countSize } = (ctx.li32)(buffer, offset)
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = ((buffer, offset) => {
          let { value: piece_id, size: piece_idSize } = (ctx.string)(buffer, offset)
          let { value: piece_type, size: piece_typeSize } = (ctx.string)(buffer, offset + piece_idSize)
          let { value: pack_id, size: pack_idSize } = (ctx.string)(buffer, offset + piece_idSize + piece_typeSize)
          let { value: is_default_piece, size: is_default_pieceSize } = (ctx.bool)(buffer, offset + piece_idSize + piece_typeSize + pack_idSize)
          let { value: product_id, size: product_idSize } = (ctx.string)(buffer, offset + piece_idSize + piece_typeSize + pack_idSize + is_default_pieceSize)
          return { value: { piece_id, piece_type, pack_id, is_default_piece, product_id }, size: piece_idSize + piece_typeSize + pack_idSize + is_default_pieceSize + product_idSize}
        })(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset + skin_idSize + skin_resource_packSize + skin_dataSize + animationsSize + cape_dataSize + geometry_dataSize + animation_dataSize + premiumSize + personaSize + cape_on_classicSize + cape_idSize + full_skin_idSize + arm_sizeSize + skin_colorSize)
      let { value: piece_tint_colors, size: piece_tint_colorsSize } = ((buffer, offset) => {
        const { value: count, size: countSize } = (ctx.li32)(buffer, offset)
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = ((buffer, offset) => {
          let { value: piece_type, size: piece_typeSize } = (ctx.string)(buffer, offset)
          let { value: colors, size: colorsSize } = ((buffer, offset) => {
            const { value: count, size: countSize } = (ctx.li32)(buffer, offset)
            if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
            const data = []
            let size = countSize
            for (let i = 0; i < count; i++) {
              const elem = (ctx.string)(buffer, offset + size)
              data.push(elem.value)
              size += elem.size
            }
            return { value: data, size }
          })(buffer, offset + piece_typeSize)
          return { value: { piece_type, colors }, size: piece_typeSize + colorsSize}
        })(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset + skin_idSize + skin_resource_packSize + skin_dataSize + animationsSize + cape_dataSize + geometry_dataSize + animation_dataSize + premiumSize + personaSize + cape_on_classicSize + cape_idSize + full_skin_idSize + arm_sizeSize + skin_colorSize + personal_piecesSize)
      return { value: { skin_id, skin_resource_pack, skin_data, animations, cape_data, geometry_data, animation_data, premium, persona, cape_on_classic, cape_id, full_skin_id, arm_size, skin_color, personal_pieces, piece_tint_colors }, size: skin_idSize + skin_resource_packSize + skin_dataSize + animationsSize + cape_dataSize + geometry_dataSize + animation_dataSize + premiumSize + personaSize + cape_on_classicSize + cape_idSize + full_skin_idSize + arm_sizeSize + skin_colorSize + personal_piecesSize + piece_tint_colorsSize}
    },
    PlayerRecords: (buffer, offset) => {
      let { value: type, size: typeSize } = ((buffer, offset) => {
        const { value, size } = (ctx.u8)(buffer, offset)
        return { value: {"0":"add","1":"remove"}[value] || value, size }
      })(buffer, offset)
      let { value: records_count, size: records_countSize } = (ctx.varint)(buffer, offset + typeSize)
      let { value: records, size: recordsSize } = ((buffer, offset) => {
        const count = records_count
        const countSize = 0
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = ((buffer, offset) => {
          switch (type) {
            case "add": return ((buffer, offset) => {
              let { value: uuid, size: uuidSize } = (ctx.uuid)(buffer, offset)
              let { value: entity_unique_id, size: entity_unique_idSize } = (ctx.zigzag64)(buffer, offset + uuidSize)
              let { value: username, size: usernameSize } = (ctx.string)(buffer, offset + uuidSize + entity_unique_idSize)
              let { value: xbox_user_id, size: xbox_user_idSize } = (ctx.string)(buffer, offset + uuidSize + entity_unique_idSize + usernameSize)
              let { value: platform_chat_id, size: platform_chat_idSize } = (ctx.string)(buffer, offset + uuidSize + entity_unique_idSize + usernameSize + xbox_user_idSize)
              let { value: build_platform, size: build_platformSize } = (ctx.li32)(buffer, offset + uuidSize + entity_unique_idSize + usernameSize + xbox_user_idSize + platform_chat_idSize)
              let { value: skin_data1, size: skin_data1Size } = (ctx.Skin)(buffer, offset + uuidSize + entity_unique_idSize + usernameSize + xbox_user_idSize + platform_chat_idSize + build_platformSize)
              let { value: is_teacher, size: is_teacherSize } = (ctx.bool)(buffer, offset + uuidSize + entity_unique_idSize + usernameSize + xbox_user_idSize + platform_chat_idSize + build_platformSize + skin_data1Size)
              let { value: is_host, size: is_hostSize } = (ctx.bool)(buffer, offset + uuidSize + entity_unique_idSize + usernameSize + xbox_user_idSize + platform_chat_idSize + build_platformSize + skin_data1Size + is_teacherSize)
              return { value: { uuid, entity_unique_id, username, xbox_user_id, platform_chat_id, build_platform, skin_data: skin_data1, is_teacher, is_host }, size: uuidSize + entity_unique_idSize + usernameSize + xbox_user_idSize + platform_chat_idSize + build_platformSize + skin_data1Size + is_teacherSize + is_hostSize}
            })(buffer, offset)
            case "remove": return ((buffer, offset) => {
              let { value: uuid, size: uuidSize } = (ctx.uuid)(buffer, offset)
              return { value: { uuid }, size: uuidSize}
            })(buffer, offset)
            default: return (ctx.void)(buffer, offset)
          }
        })(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset + typeSize + records_countSize)
      let { value: verified, size: verifiedSize } = ((buffer, offset) => {
        const count = records_count
        const countSize = 0
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = (ctx.bool)(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset + typeSize + records_countSize + recordsSize)
      return { value: { type, records_count, records, verified }, size: typeSize + records_countSize + recordsSize + verifiedSize}
    },
    ScoreEntries: (buffer, offset) => {
      let { value: type, size: typeSize } = ((buffer, offset) => {
        const { value, size } = (ctx.u8)(buffer, offset)
        return { value: {"0":"change","1":"remove"}[value] || value, size }
      })(buffer, offset)
      let { value: entries, size: entriesSize } = ((buffer, offset) => {
        const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = ((buffer, offset) => {
          let { value: scoreboard_id, size: scoreboard_idSize } = (ctx.zigzag64)(buffer, offset)
          let { value: objective_name, size: objective_nameSize } = (ctx.string)(buffer, offset + scoreboard_idSize)
          let { value: score, size: scoreSize } = (ctx.li32)(buffer, offset + scoreboard_idSize + objective_nameSize)
          let { value: entry_type, size: entry_typeSize } = ((buffer, offset) => {
            switch (type1) {
              case "remove": return ((buffer, offset) => {
                const { value, size } = (ctx.i8)(buffer, offset)
                return { value: {"1":"player","2":"entity","3":"fake_player"}[value] || value, size }
              })(buffer, offset)
              default: return (ctx.void)(buffer, offset)
            }
          })(buffer, offset + scoreboard_idSize + objective_nameSize + scoreSize)
          let { value: entity_unique_id, size: entity_unique_idSize } = ((buffer, offset) => {
            switch (type1) {
              case "remove": return ((buffer, offset) => {
                switch (entry_type) {
                  case "player": return (ctx.zigzag64)(buffer, offset)
                  case "entity": return (ctx.zigzag64)(buffer, offset)
                  default: return (ctx.void)(buffer, offset)
                }
              })(buffer, offset)
              default: return (ctx.void)(buffer, offset)
            }
          })(buffer, offset + scoreboard_idSize + objective_nameSize + scoreSize + entry_typeSize)
          let { value: custom_name, size: custom_nameSize } = ((buffer, offset) => {
            switch (type1) {
              case "remove": return ((buffer, offset) => {
                switch (entry_type) {
                  case "fake_player": return (ctx.string)(buffer, offset)
                  default: return (ctx.void)(buffer, offset)
                }
              })(buffer, offset)
              default: return (ctx.void)(buffer, offset)
            }
          })(buffer, offset + scoreboard_idSize + objective_nameSize + scoreSize + entry_typeSize + entity_unique_idSize)
          return { value: { scoreboard_id, objective_name, score, entry_type, entity_unique_id, custom_name }, size: scoreboard_idSize + objective_nameSize + scoreSize + entry_typeSize + entity_unique_idSize + custom_nameSize}
        })(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset + typeSize)
      return { value: { type, entries }, size: typeSize + entriesSize}
    },
    ScoreboardIdentityEntries: (buffer, offset) => {
      let { value: type, size: typeSize } = ((buffer, offset) => {
        const { value, size } = (ctx.i8)(buffer, offset)
        return { value: {"0":"TYPE_REGISTER_IDENTITY","1":"TYPE_CLEAR_IDENTITY"}[value] || value, size }
      })(buffer, offset)
      let { value: entries, size: entriesSize } = ((buffer, offset) => {
        const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = ((buffer, offset) => {
          let { value: scoreboard_id, size: scoreboard_idSize } = (ctx.zigzag64)(buffer, offset)
          let { value: entity_unique_id, size: entity_unique_idSize } = ((buffer, offset) => {
            switch (type1) {
              case "TYPE_REGISTER_IDENTITY": return (ctx.zigzag64)(buffer, offset)
              default: return (ctx.void)(buffer, offset)
            }
          })(buffer, offset + scoreboard_idSize)
          return { value: { scoreboard_id, entity_unique_id }, size: scoreboard_idSize + entity_unique_idSize}
        })(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset + typeSize)
      return { value: { type, entries }, size: typeSize + entriesSize}
    },
    Enchant: (buffer, offset) => {
      let { value: id, size: idSize } = (ctx.u8)(buffer, offset)
      let { value: level, size: levelSize } = (ctx.u8)(buffer, offset + idSize)
      return { value: { id, level }, size: idSize + levelSize}
    },
    EnchantOptions: (buffer, offset) => {
      const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
      if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
      const data = []
      let size = countSize
      for (let i = 0; i < count; i++) {
        const elem = ((buffer, offset) => {
        let { value: cost, size: costSize } = (ctx.varint)(buffer, offset)
        let { value: slot_flags, size: slot_flagsSize } = (ctx.li32)(buffer, offset + costSize)
        let { value: equip_enchants, size: equip_enchantsSize } = ((buffer, offset) => {
          const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
          if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
          const data = []
          let size = countSize
          for (let i = 0; i < count; i++) {
            const elem = (ctx.Enchant)(buffer, offset + size)
            data.push(elem.value)
            size += elem.size
          }
          return { value: data, size }
        })(buffer, offset + costSize + slot_flagsSize)
        let { value: held_enchants, size: held_enchantsSize } = ((buffer, offset) => {
          const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
          if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
          const data = []
          let size = countSize
          for (let i = 0; i < count; i++) {
            const elem = (ctx.Enchant)(buffer, offset + size)
            data.push(elem.value)
            size += elem.size
          }
          return { value: data, size }
        })(buffer, offset + costSize + slot_flagsSize + equip_enchantsSize)
        let { value: self_enchants, size: self_enchantsSize } = ((buffer, offset) => {
          const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
          if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
          const data = []
          let size = countSize
          for (let i = 0; i < count; i++) {
            const elem = (ctx.Enchant)(buffer, offset + size)
            data.push(elem.value)
            size += elem.size
          }
          return { value: data, size }
        })(buffer, offset + costSize + slot_flagsSize + equip_enchantsSize + held_enchantsSize)
        let { value: name1, size: name1Size } = (ctx.string)(buffer, offset + costSize + slot_flagsSize + equip_enchantsSize + held_enchantsSize + self_enchantsSize)
        let { value: option_id, size: option_idSize } = (ctx.zigzag32)(buffer, offset + costSize + slot_flagsSize + equip_enchantsSize + held_enchantsSize + self_enchantsSize + name1Size)
        return { value: { cost, slot_flags, equip_enchants, held_enchants, self_enchants, name: name1, option_id }, size: costSize + slot_flagsSize + equip_enchantsSize + held_enchantsSize + self_enchantsSize + name1Size + option_idSize}
      })(buffer, offset + size)
        data.push(elem.value)
        size += elem.size
      }
      return { value: data, size }
    },
    StackRequestSlotInfo: (buffer, offset) => {
      let { value: container_id, size: container_idSize } = (ctx.u8)(buffer, offset)
      let { value: slot_id, size: slot_idSize } = (ctx.u8)(buffer, offset + container_idSize)
      let { value: stack_id, size: stack_idSize } = (ctx.zigzag32)(buffer, offset + container_idSize + slot_idSize)
      return { value: { container_id, slot_id, stack_id }, size: container_idSize + slot_idSize + stack_idSize}
    },
    ItemStackRequests: (buffer, offset) => {
      const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
      if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
      const data = []
      let size = countSize
      for (let i = 0; i < count; i++) {
        const elem = ((buffer, offset) => {
        let { value: request_id, size: request_idSize } = (ctx.zigzag32)(buffer, offset)
        let { value: actions, size: actionsSize } = ((buffer, offset) => {
          const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
          if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
          const data = []
          let size = countSize
          for (let i = 0; i < count; i++) {
            const elem = ((buffer, offset) => {
            let { value: type_id, size: type_idSize } = ((buffer, offset) => {
              const { value, size } = (ctx.u8)(buffer, offset)
              return { value: {"0":"take","1":"place","2":"swap","3":"drop","4":"destroy","5":"consume","6":"create","7":"lab_table_combine","8":"beacon_payment","9":"craft_recipe","10":"craft_recipe_auto","11":"craft_creative","12":"optional","13":"non_implemented","14":"results_deprecated"}[value] || value, size }
            })(buffer, offset)
            let { value: count1, size: count1Size } = ((buffer, offset) => {
              switch (type_id) {
                case "take": return (ctx.u8)(buffer, offset)
                case "place": return (ctx.u8)(buffer, offset)
                case "drop": return (ctx.u8)(buffer, offset)
                case "destroy": return (ctx.u8)(buffer, offset)
                case "consume": return (ctx.u8)(buffer, offset)
                case "non_implemented": return (ctx.void)(buffer, offset)
                default: return (ctx.void)(buffer, offset)
              }
            })(buffer, offset + type_idSize)
            let { value: source, size: sourceSize } = ((buffer, offset) => {
              switch (type_id) {
                case "take": return (ctx.StackRequestSlotInfo)(buffer, offset)
                case "place": return (ctx.StackRequestSlotInfo)(buffer, offset)
                case "swap": return (ctx.StackRequestSlotInfo)(buffer, offset)
                case "drop": return (ctx.StackRequestSlotInfo)(buffer, offset)
                case "destroy": return (ctx.StackRequestSlotInfo)(buffer, offset)
                case "consume": return (ctx.StackRequestSlotInfo)(buffer, offset)
                case "non_implemented": return (ctx.void)(buffer, offset)
                default: return (ctx.void)(buffer, offset)
              }
            })(buffer, offset + type_idSize + count1Size)
            let { value: destination, size: destinationSize } = ((buffer, offset) => {
              switch (type_id) {
                case "take": return (ctx.StackRequestSlotInfo)(buffer, offset)
                case "place": return (ctx.StackRequestSlotInfo)(buffer, offset)
                case "swap": return (ctx.StackRequestSlotInfo)(buffer, offset)
                case "non_implemented": return (ctx.void)(buffer, offset)
                default: return (ctx.void)(buffer, offset)
              }
            })(buffer, offset + type_idSize + count1Size + sourceSize)
            let { value: randomly, size: randomlySize } = ((buffer, offset) => {
              switch (type_id) {
                case "drop": return (ctx.bool)(buffer, offset)
                case "non_implemented": return (ctx.void)(buffer, offset)
                default: return (ctx.void)(buffer, offset)
              }
            })(buffer, offset + type_idSize + count1Size + sourceSize + destinationSize)
            let { value: result_slot_id, size: result_slot_idSize } = ((buffer, offset) => {
              switch (type_id) {
                case "create": return (ctx.u8)(buffer, offset)
                case "non_implemented": return (ctx.void)(buffer, offset)
                default: return (ctx.void)(buffer, offset)
              }
            })(buffer, offset + type_idSize + count1Size + sourceSize + destinationSize + randomlySize)
            let { value: primary_effect, size: primary_effectSize } = ((buffer, offset) => {
              switch (type_id) {
                case "beacon_payment": return (ctx.zigzag32)(buffer, offset)
                case "non_implemented": return (ctx.void)(buffer, offset)
                default: return (ctx.void)(buffer, offset)
              }
            })(buffer, offset + type_idSize + count1Size + sourceSize + destinationSize + randomlySize + result_slot_idSize)
            let { value: secondary_effect, size: secondary_effectSize } = ((buffer, offset) => {
              switch (type_id) {
                case "beacon_payment": return (ctx.zigzag32)(buffer, offset)
                case "non_implemented": return (ctx.void)(buffer, offset)
                default: return (ctx.void)(buffer, offset)
              }
            })(buffer, offset + type_idSize + count1Size + sourceSize + destinationSize + randomlySize + result_slot_idSize + primary_effectSize)
            let { value: recipe_network_id, size: recipe_network_idSize } = ((buffer, offset) => {
              switch (type_id) {
                case "craft_recipe": return (ctx.varint)(buffer, offset)
                case "craft_recipe_auto": return (ctx.varint)(buffer, offset)
                case "optional": return (ctx.varint)(buffer, offset)
                case "non_implemented": return (ctx.void)(buffer, offset)
                default: return (ctx.void)(buffer, offset)
              }
            })(buffer, offset + type_idSize + count1Size + sourceSize + destinationSize + randomlySize + result_slot_idSize + primary_effectSize + secondary_effectSize)
            let { value: creative_item_network_id, size: creative_item_network_idSize } = ((buffer, offset) => {
              switch (type_id) {
                case "craft_creative": return (ctx.varint32)(buffer, offset)
                case "non_implemented": return (ctx.void)(buffer, offset)
                default: return (ctx.void)(buffer, offset)
              }
            })(buffer, offset + type_idSize + count1Size + sourceSize + destinationSize + randomlySize + result_slot_idSize + primary_effectSize + secondary_effectSize + recipe_network_idSize)
            let { value: filtered_string_index, size: filtered_string_indexSize } = ((buffer, offset) => {
              switch (type_id) {
                case "optional": return (ctx.li32)(buffer, offset)
                case "non_implemented": return (ctx.void)(buffer, offset)
                default: return (ctx.void)(buffer, offset)
              }
            })(buffer, offset + type_idSize + count1Size + sourceSize + destinationSize + randomlySize + result_slot_idSize + primary_effectSize + secondary_effectSize + recipe_network_idSize + creative_item_network_idSize)
            let { value: result_items, size: result_itemsSize } = ((buffer, offset) => {
              switch (type_id) {
                case "non_implemented": return (ctx.void)(buffer, offset)
                case "results_deprecated": return ((buffer, offset) => {
                  const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
                  if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
                  const data = []
                  let size = countSize
                  for (let i = 0; i < count; i++) {
                    const elem = (ctx.Item)(buffer, offset + size)
                    data.push(elem.value)
                    size += elem.size
                  }
                  return { value: data, size }
                })(buffer, offset)
                default: return (ctx.void)(buffer, offset)
              }
            })(buffer, offset + type_idSize + count1Size + sourceSize + destinationSize + randomlySize + result_slot_idSize + primary_effectSize + secondary_effectSize + recipe_network_idSize + creative_item_network_idSize + filtered_string_indexSize)
            let { value: times_crafted, size: times_craftedSize } = ((buffer, offset) => {
              switch (type_id) {
                case "non_implemented": return (ctx.void)(buffer, offset)
                case "results_deprecated": return (ctx.u8)(buffer, offset)
                default: return (ctx.void)(buffer, offset)
              }
            })(buffer, offset + type_idSize + count1Size + sourceSize + destinationSize + randomlySize + result_slot_idSize + primary_effectSize + secondary_effectSize + recipe_network_idSize + creative_item_network_idSize + filtered_string_indexSize + result_itemsSize)
            return { value: { type_id, count: count1, source, destination, randomly, result_slot_id, primary_effect, secondary_effect, recipe_network_id, creative_item_network_id, filtered_string_index, result_items, times_crafted }, size: type_idSize + count1Size + sourceSize + destinationSize + randomlySize + result_slot_idSize + primary_effectSize + secondary_effectSize + recipe_network_idSize + creative_item_network_idSize + filtered_string_indexSize + result_itemsSize + times_craftedSize}
          })(buffer, offset + size)
            data.push(elem.value)
            size += elem.size
          }
          return { value: data, size }
        })(buffer, offset + request_idSize)
        let { value: custom_names, size: custom_namesSize } = ((buffer, offset) => {
          const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
          if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
          const data = []
          let size = countSize
          for (let i = 0; i < count; i++) {
            const elem = (ctx.string)(buffer, offset + size)
            data.push(elem.value)
            size += elem.size
          }
          return { value: data, size }
        })(buffer, offset + request_idSize + actionsSize)
        return { value: { request_id, actions, custom_names }, size: request_idSize + actionsSize + custom_namesSize}
      })(buffer, offset + size)
        data.push(elem.value)
        size += elem.size
      }
      return { value: data, size }
    },
    ItemStackResponses: (buffer, offset) => {
      const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
      if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
      const data = []
      let size = countSize
      for (let i = 0; i < count; i++) {
        const elem = ((buffer, offset) => {
        let { value: result, size: resultSize } = (ctx.u8)(buffer, offset)
        let { value: request_id, size: request_idSize } = (ctx.varint32)(buffer, offset + resultSize)
        let { value: containers, size: containersSize } = ((buffer, offset) => {
          const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
          if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
          const data = []
          let size = countSize
          for (let i = 0; i < count; i++) {
            const elem = ((buffer, offset) => {
            let { value: container_id1, size: container_id1Size } = (ctx.u8)(buffer, offset)
            let { value: slots, size: slotsSize } = ((buffer, offset) => {
              const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
              if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
              const data = []
              let size = countSize
              for (let i = 0; i < count; i++) {
                const elem = ((buffer, offset) => {
                let { value: slot, size: slotSize } = (ctx.u8)(buffer, offset)
                let { value: hotbar_slot, size: hotbar_slotSize } = (ctx.u8)(buffer, offset + slotSize)
                let { value: count1, size: count1Size } = (ctx.u8)(buffer, offset + slotSize + hotbar_slotSize)
                let { value: item_stack_id, size: item_stack_idSize } = (ctx.varint32)(buffer, offset + slotSize + hotbar_slotSize + count1Size)
                let { value: custom_name, size: custom_nameSize } = (ctx.string)(buffer, offset + slotSize + hotbar_slotSize + count1Size + item_stack_idSize)
                return { value: { slot, hotbar_slot, count: count1, item_stack_id, custom_name }, size: slotSize + hotbar_slotSize + count1Size + item_stack_idSize + custom_nameSize}
              })(buffer, offset + size)
                data.push(elem.value)
                size += elem.size
              }
              return { value: data, size }
            })(buffer, offset + container_id1Size)
            return { value: { container_id: container_id1, slots }, size: container_id1Size + slotsSize}
          })(buffer, offset + size)
            data.push(elem.value)
            size += elem.size
          }
          return { value: data, size }
        })(buffer, offset + resultSize + request_idSize)
        return { value: { result, request_id, containers }, size: resultSize + request_idSize + containersSize}
      })(buffer, offset + size)
        data.push(elem.value)
        size += elem.size
      }
      return { value: data, size }
    },
    ItemComponentList: (buffer, offset) => {
      const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
      if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
      const data = []
      let size = countSize
      for (let i = 0; i < count; i++) {
        const elem = ((buffer, offset) => {
        let { value: name1, size: name1Size } = (ctx.string)(buffer, offset)
        let { value: nbt1, size: nbt1Size } = (ctx.nbt)(buffer, offset + name1Size)
        return { value: { name: name1, nbt: nbt1 }, size: name1Size + nbt1Size}
      })(buffer, offset + size)
        data.push(elem.value)
        size += elem.size
      }
      return { value: data, size }
    },
    CommandOrigin: (buffer, offset) => {
      let { value: type, size: typeSize } = ((buffer, offset) => {
        const { value, size } = (ctx.varint)(buffer, offset)
        return { value: {"0":"player","1":"block","2":"minecart_block","3":"dev_console","4":"test","5":"automation_player","6":"client_automation","7":"dedicated_server","8":"entity","9":"virtual","10":"game_argument","11":"entity_server"}[value] || value, size }
      })(buffer, offset)
      let { value: uuid, size: uuidSize } = (ctx.uuid)(buffer, offset + typeSize)
      let { value: request_id, size: request_idSize } = (ctx.string)(buffer, offset + typeSize + uuidSize)
      let { value: player_entity_id, size: player_entity_idSize } = ((buffer, offset) => {
        switch (type) {
          case "dev_console": return ((buffer, offset) => {
            let { value: player_entity_id1, size: player_entity_id1Size } = (ctx.zigzag64)(buffer, offset)
            return { value: { player_entity_id: player_entity_id1 }, size: player_entity_id1Size}
          })(buffer, offset)
          case "test": return ((buffer, offset) => {
            let { value: player_entity_id1, size: player_entity_id1Size } = (ctx.zigzag64)(buffer, offset)
            return { value: { player_entity_id: player_entity_id1 }, size: player_entity_id1Size}
          })(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + typeSize + uuidSize + request_idSize)
      return { value: { type, uuid, request_id, player_entity_id }, size: typeSize + uuidSize + request_idSize + player_entity_idSize}
    },
    WindowID: (buffer, offset) => {
      const { value, size } = (ctx.i8)(buffer, offset)
      return { value: {"0":"inventory","1":"first","100":"last","119":"offhand","120":"armor","121":"creative","122":"hotbar","123":"fixed_inventory","124":"ui","-100":"drop_contents","-24":"beacon","-23":"trading_output","-22":"trading_use_inputs","-21":"trading_input_2","-20":"trading_input_1","-17":"enchant_output","-16":"enchant_material","-15":"enchant_input","-13":"anvil_output","-12":"anvil_result","-11":"anvil_material","-10":"container_input","-5":"crafting_use_ingredient","-4":"crafting_result","-3":"crafting_remove_ingredient","-2":"crafting_add_ingredient","-1":"none"}[value] || value, size }
    },
    WindowType: (buffer, offset) => {
      const { value, size } = (ctx.u8)(buffer, offset)
      return { value: {"0":"container","1":"workbench","2":"furnace","3":"enchantment","4":"brewing_stand","5":"anvil","6":"dispenser","7":"dropper","8":"hopper","9":"cauldron","10":"minecart_chest","11":"minecart_hopper","12":"horse","13":"beacon","14":"structure_editor","15":"trading","16":"command_block","17":"jukebox","18":"armor","19":"hand","20":"compound_creator","21":"element_constructor","22":"material_reducer","23":"lab_table","24":"loom","25":"lectern","26":"grindstone","27":"blast_furnace","28":"smoker","29":"stonecutter","30":"cartography","31":"hud","32":"jigsaw_editor","33":"smithing_table"}[value] || value, size }
    },
    LegacyEntityType: (buffer, offset) => {
      const { value, size } = (ctx.li32)(buffer, offset)
      return { value: {"10":"chicken","11":"cow","12":"pig","13":"sheep","14":"wolf","15":"villager","16":"mooshroom","17":"squid","18":"rabbit","19":"bat","20":"iron_golem","21":"snow_golem","22":"ocelot","23":"horse","24":"donkey","25":"mule","26":"skeleton_horse","27":"zombie_horse","28":"polar_bear","29":"llama","30":"parrot","31":"dolphin","32":"zombie","33":"creeper","34":"skeleton","35":"spider","36":"zombie_pigman","37":"slime","38":"enderman","39":"silverfish","40":"cave_spider","41":"ghast","42":"magma_cube","43":"blaze","44":"zombie_villager","45":"witch","46":"stray","47":"husk","48":"wither_skeleton","49":"guardian","50":"elder_guardian","51":"npc","52":"wither","53":"ender_dragon","54":"shulker","55":"endermite","56":"agent","57":"vindicator","58":"phantom","61":"armor_stand","62":"tripod_camera","63":"player","64":"item","65":"tnt","66":"falling_block","67":"moving_block","68":"xp_bottle","69":"xp_orb","70":"eye_of_ender_signal","71":"ender_crystal","72":"fireworks_rocket","73":"thrown_trident","74":"turtle","75":"cat","76":"shulker_bullet","77":"fishing_hook","78":"chalkboard","79":"dragon_fireball","80":"arrow","81":"snowball","82":"egg","83":"painting","84":"minecart","85":"fireball","86":"splash_potion","87":"ender_pearl","88":"leash_knot","89":"wither_skull","90":"boat","91":"wither_skull_dangerous","93":"lightning_bolt","94":"small_fireball","95":"area_effect_cloud","96":"hopper_minecart","97":"tnt_minecart","98":"chest_minecart","100":"command_block_minecart","101":"lingering_potion","102":"llama_spit","103":"evocation_fang","104":"evocation_illager","105":"vex","106":"ice_bomb","107":"balloon","108":"pufferfish","109":"salmon","110":"drowned","111":"tropicalfish","112":"cod","113":"panda"}[value] || value, size }
    },
    mcpe_packet: (buffer, offset) => {
      let { value: name, size: nameSize } = ((buffer, offset) => {
        const { value, size } = (ctx.varint)(buffer, offset)
        return { value: {"1":"login","2":"play_status","3":"server_to_client_handshake","4":"client_to_server_handshake","5":"disconnect","6":"resource_packs_info","7":"resource_pack_stack","8":"resource_pack_client_response","9":"text","10":"set_time","11":"start_game","12":"add_player","13":"add_entity","14":"remove_entity","15":"add_item_entity","17":"take_item_entity","18":"move_entity","19":"move_player","20":"rider_jump","21":"update_block","22":"add_painting","23":"tick_sync","24":"level_sound_event_old","25":"level_event","26":"block_event","27":"entity_event","28":"mob_effect","29":"update_attributes","30":"inventory_transaction","31":"mob_equipment","32":"mob_armor_equipment","33":"interact","34":"block_pick_request","35":"entity_pick_request","36":"player_action","38":"hurt_armor","39":"set_entity_data","40":"set_entity_motion","41":"set_entity_link","42":"set_health","43":"set_spawn_position","44":"animate","45":"respawn","46":"container_open","47":"container_close","48":"player_hotbar","49":"inventory_content","50":"inventory_slot","51":"container_set_data","52":"crafting_data","53":"crafting_event","54":"gui_data_pick_item","55":"adventure_settings","56":"block_entity_data","57":"player_input","58":"level_chunk","59":"set_commands_enabled","60":"set_difficulty","61":"change_dimension","62":"set_player_game_type","63":"player_list","64":"simple_event","65":"event","66":"spawn_experience_orb","67":"clientbound_map_item_data","68":"map_info_request","69":"request_chunk_radius","70":"chunk_radius_update","71":"item_frame_drop_item","72":"game_rules_changed","73":"camera","74":"boss_event","75":"show_credits","76":"available_commands","77":"command_request","78":"command_block_update","79":"command_output","80":"update_trade","81":"update_equipment","82":"resource_pack_data_info","83":"resource_pack_chunk_data","84":"resource_pack_chunk_request","85":"transfer","86":"play_sound","87":"stop_sound","88":"set_title","89":"add_behavior_tree","90":"structure_block_update","91":"show_store_offer","92":"purchase_receipt","93":"player_skin","94":"sub_client_login","95":"initiate_web_socket_connection","96":"set_last_hurt_by","97":"book_edit","98":"npc_request","99":"photo_transfer","100":"modal_form_request","101":"modal_form_response","102":"server_settings_request","103":"server_settings_response","104":"show_profile","105":"set_default_game_type","106":"remove_objective","107":"set_display_objective","108":"set_score","109":"lab_table","110":"update_block_synced","111":"move_entity_delta","112":"set_scoreboard_identity","113":"set_local_player_as_initialized","114":"update_soft_enum","115":"network_stack_latency","117":"script_custom_event","118":"spawn_particle_effect","119":"available_entity_identifiers","120":"level_sound_event_v2","121":"network_chunk_publisher_update","122":"biome_definition_list","123":"level_sound_event","124":"level_event_generic","125":"lectern_update","126":"video_stream_connect","127":"add_ecs_entity","128":"remove_ecs_entity","129":"client_cache_status","130":"on_screen_texture_animation","131":"map_create_locked_copy","132":"structure_template_data_export_request","133":"structure_template_data_export_response","134":"update_block_properties","135":"client_cache_blob_status","136":"client_cache_miss_response","137":"education_settings","139":"multiplayer_settings","140":"settings_command","141":"anvil_damage","142":"completed_using_item","143":"network_settings","144":"player_auth_input","145":"creative_content","146":"player_enchant_options","147":"item_stack_request","148":"item_stack_response","149":"player_armor_damage","151":"update_player_game_type","153":"position_tracking_db_broadcast","154":"position_tracking_db_request","156":"packet_violation_warning","157":"motion_prediction_hints","158":"animate_entity","159":"camera_shake","160":"player_fog","161":"correct_player_move_prediction","162":"item_component","163":"filter_text_packet"}[value] || value, size }
      })(buffer, offset)
      let { value: params, size: paramsSize } = ((buffer, offset) => {
        switch (name) {
          case "login": return (ctx.packet_login)(buffer, offset)
          case "play_status": return (ctx.packet_play_status)(buffer, offset)
          case "server_to_client_handshake": return (ctx.packet_server_to_client_handshake)(buffer, offset)
          case "client_to_server_handshake": return (ctx.packet_client_to_server_handshake)(buffer, offset)
          case "disconnect": return (ctx.packet_disconnect)(buffer, offset)
          case "resource_packs_info": return (ctx.packet_resource_packs_info)(buffer, offset)
          case "resource_pack_stack": return (ctx.packet_resource_pack_stack)(buffer, offset)
          case "resource_pack_client_response": return (ctx.packet_resource_pack_client_response)(buffer, offset)
          case "text": return (ctx.packet_text)(buffer, offset)
          case "set_time": return (ctx.packet_set_time)(buffer, offset)
          case "start_game": return (ctx.packet_start_game)(buffer, offset)
          case "add_player": return (ctx.packet_add_player)(buffer, offset)
          case "add_entity": return (ctx.packet_add_entity)(buffer, offset)
          case "remove_entity": return (ctx.packet_remove_entity)(buffer, offset)
          case "add_item_entity": return (ctx.packet_add_item_entity)(buffer, offset)
          case "take_item_entity": return (ctx.packet_take_item_entity)(buffer, offset)
          case "move_entity": return (ctx.packet_move_entity)(buffer, offset)
          case "move_player": return (ctx.packet_move_player)(buffer, offset)
          case "rider_jump": return (ctx.packet_rider_jump)(buffer, offset)
          case "update_block": return (ctx.packet_update_block)(buffer, offset)
          case "add_painting": return (ctx.packet_add_painting)(buffer, offset)
          case "tick_sync": return (ctx.packet_tick_sync)(buffer, offset)
          case "level_sound_event_old": return (ctx.packet_level_sound_event_old)(buffer, offset)
          case "level_event": return (ctx.packet_level_event)(buffer, offset)
          case "block_event": return (ctx.packet_block_event)(buffer, offset)
          case "entity_event": return (ctx.packet_entity_event)(buffer, offset)
          case "mob_effect": return (ctx.packet_mob_effect)(buffer, offset)
          case "update_attributes": return (ctx.packet_update_attributes)(buffer, offset)
          case "inventory_transaction": return (ctx.packet_inventory_transaction)(buffer, offset)
          case "mob_equipment": return (ctx.packet_mob_equipment)(buffer, offset)
          case "mob_armor_equipment": return (ctx.packet_mob_armor_equipment)(buffer, offset)
          case "interact": return (ctx.packet_interact)(buffer, offset)
          case "block_pick_request": return (ctx.packet_block_pick_request)(buffer, offset)
          case "entity_pick_request": return (ctx.packet_entity_pick_request)(buffer, offset)
          case "player_action": return (ctx.packet_player_action)(buffer, offset)
          case "hurt_armor": return (ctx.packet_hurt_armor)(buffer, offset)
          case "set_entity_data": return (ctx.packet_set_entity_data)(buffer, offset)
          case "set_entity_motion": return (ctx.packet_set_entity_motion)(buffer, offset)
          case "set_entity_link": return (ctx.packet_set_entity_link)(buffer, offset)
          case "set_health": return (ctx.packet_set_health)(buffer, offset)
          case "set_spawn_position": return (ctx.packet_set_spawn_position)(buffer, offset)
          case "animate": return (ctx.packet_animate)(buffer, offset)
          case "respawn": return (ctx.packet_respawn)(buffer, offset)
          case "container_open": return (ctx.packet_container_open)(buffer, offset)
          case "container_close": return (ctx.packet_container_close)(buffer, offset)
          case "player_hotbar": return (ctx.packet_player_hotbar)(buffer, offset)
          case "inventory_content": return (ctx.packet_inventory_content)(buffer, offset)
          case "inventory_slot": return (ctx.packet_inventory_slot)(buffer, offset)
          case "container_set_data": return (ctx.packet_container_set_data)(buffer, offset)
          case "crafting_data": return (ctx.packet_crafting_data)(buffer, offset)
          case "crafting_event": return (ctx.packet_crafting_event)(buffer, offset)
          case "gui_data_pick_item": return (ctx.packet_gui_data_pick_item)(buffer, offset)
          case "adventure_settings": return (ctx.packet_adventure_settings)(buffer, offset)
          case "block_entity_data": return (ctx.packet_block_entity_data)(buffer, offset)
          case "player_input": return (ctx.packet_player_input)(buffer, offset)
          case "level_chunk": return (ctx.packet_level_chunk)(buffer, offset)
          case "set_commands_enabled": return (ctx.packet_set_commands_enabled)(buffer, offset)
          case "set_difficulty": return (ctx.packet_set_difficulty)(buffer, offset)
          case "change_dimension": return (ctx.packet_change_dimension)(buffer, offset)
          case "set_player_game_type": return (ctx.packet_set_player_game_type)(buffer, offset)
          case "player_list": return (ctx.packet_player_list)(buffer, offset)
          case "simple_event": return (ctx.packet_simple_event)(buffer, offset)
          case "event": return (ctx.packet_event)(buffer, offset)
          case "spawn_experience_orb": return (ctx.packet_spawn_experience_orb)(buffer, offset)
          case "clientbound_map_item_data": return (ctx.packet_clientbound_map_item_data)(buffer, offset)
          case "map_info_request": return (ctx.packet_map_info_request)(buffer, offset)
          case "request_chunk_radius": return (ctx.packet_request_chunk_radius)(buffer, offset)
          case "chunk_radius_update": return (ctx.packet_chunk_radius_update)(buffer, offset)
          case "item_frame_drop_item": return (ctx.packet_item_frame_drop_item)(buffer, offset)
          case "game_rules_changed": return (ctx.packet_game_rules_changed)(buffer, offset)
          case "camera": return (ctx.packet_camera)(buffer, offset)
          case "boss_event": return (ctx.packet_boss_event)(buffer, offset)
          case "show_credits": return (ctx.packet_show_credits)(buffer, offset)
          case "available_commands": return (ctx.packet_available_commands)(buffer, offset)
          case "command_request": return (ctx.packet_command_request)(buffer, offset)
          case "command_block_update": return (ctx.packet_command_block_update)(buffer, offset)
          case "command_output": return (ctx.packet_command_output)(buffer, offset)
          case "update_trade": return (ctx.packet_update_trade)(buffer, offset)
          case "update_equipment": return (ctx.packet_update_equipment)(buffer, offset)
          case "resource_pack_data_info": return (ctx.packet_resource_pack_data_info)(buffer, offset)
          case "resource_pack_chunk_data": return (ctx.packet_resource_pack_chunk_data)(buffer, offset)
          case "resource_pack_chunk_request": return (ctx.packet_resource_pack_chunk_request)(buffer, offset)
          case "transfer": return (ctx.packet_transfer)(buffer, offset)
          case "play_sound": return (ctx.packet_play_sound)(buffer, offset)
          case "stop_sound": return (ctx.packet_stop_sound)(buffer, offset)
          case "set_title": return (ctx.packet_set_title)(buffer, offset)
          case "add_behavior_tree": return (ctx.packet_add_behavior_tree)(buffer, offset)
          case "structure_block_update": return (ctx.packet_structure_block_update)(buffer, offset)
          case "show_store_offer": return (ctx.packet_show_store_offer)(buffer, offset)
          case "purchase_receipt": return (ctx.packet_purchase_receipt)(buffer, offset)
          case "player_skin": return (ctx.packet_player_skin)(buffer, offset)
          case "sub_client_login": return (ctx.packet_sub_client_login)(buffer, offset)
          case "initiate_web_socket_connection": return (ctx.packet_initiate_web_socket_connection)(buffer, offset)
          case "set_last_hurt_by": return (ctx.packet_set_last_hurt_by)(buffer, offset)
          case "book_edit": return (ctx.packet_book_edit)(buffer, offset)
          case "npc_request": return (ctx.packet_npc_request)(buffer, offset)
          case "photo_transfer": return (ctx.packet_photo_transfer)(buffer, offset)
          case "modal_form_request": return (ctx.packet_modal_form_request)(buffer, offset)
          case "modal_form_response": return (ctx.packet_modal_form_response)(buffer, offset)
          case "server_settings_request": return (ctx.packet_server_settings_request)(buffer, offset)
          case "server_settings_response": return (ctx.packet_server_settings_response)(buffer, offset)
          case "show_profile": return (ctx.packet_show_profile)(buffer, offset)
          case "set_default_game_type": return (ctx.packet_set_default_game_type)(buffer, offset)
          case "remove_objective": return (ctx.packet_remove_objective)(buffer, offset)
          case "set_display_objective": return (ctx.packet_set_display_objective)(buffer, offset)
          case "set_score": return (ctx.packet_set_score)(buffer, offset)
          case "lab_table": return (ctx.packet_lab_table)(buffer, offset)
          case "update_block_synced": return (ctx.packet_update_block_synced)(buffer, offset)
          case "move_entity_delta": return (ctx.packet_move_entity_delta)(buffer, offset)
          case "set_scoreboard_identity": return (ctx.packet_set_scoreboard_identity)(buffer, offset)
          case "set_local_player_as_initialized": return (ctx.packet_set_local_player_as_initialized)(buffer, offset)
          case "update_soft_enum": return (ctx.packet_update_soft_enum)(buffer, offset)
          case "network_stack_latency": return (ctx.packet_network_stack_latency)(buffer, offset)
          case "script_custom_event": return (ctx.packet_script_custom_event)(buffer, offset)
          case "spawn_particle_effect": return (ctx.packet_spawn_particle_effect)(buffer, offset)
          case "available_entity_identifiers": return (ctx.packet_available_entity_identifiers)(buffer, offset)
          case "level_sound_event_v2": return (ctx.packet_level_sound_event_v2)(buffer, offset)
          case "network_chunk_publisher_update": return (ctx.packet_network_chunk_publisher_update)(buffer, offset)
          case "biome_definition_list": return (ctx.packet_biome_definition_list)(buffer, offset)
          case "level_sound_event": return (ctx.packet_level_sound_event)(buffer, offset)
          case "level_event_generic": return (ctx.packet_level_event_generic)(buffer, offset)
          case "lectern_update": return (ctx.packet_lectern_update)(buffer, offset)
          case "video_stream_connect": return (ctx.packet_video_stream_connect)(buffer, offset)
          case "add_ecs_entity": return (ctx.packet_add_ecs_entity)(buffer, offset)
          case "remove_ecs_entity": return (ctx.packet_remove_ecs_entity)(buffer, offset)
          case "client_cache_status": return (ctx.packet_client_cache_status)(buffer, offset)
          case "on_screen_texture_animation": return (ctx.packet_on_screen_texture_animation)(buffer, offset)
          case "map_create_locked_copy": return (ctx.packet_map_create_locked_copy)(buffer, offset)
          case "structure_template_data_export_request": return (ctx.packet_structure_template_data_export_request)(buffer, offset)
          case "structure_template_data_export_response": return (ctx.packet_structure_template_data_export_response)(buffer, offset)
          case "update_block_properties": return (ctx.packet_update_block_properties)(buffer, offset)
          case "client_cache_blob_status": return (ctx.packet_client_cache_blob_status)(buffer, offset)
          case "client_cache_miss_response": return (ctx.packet_client_cache_miss_response)(buffer, offset)
          case "education_settings": return (ctx.packet_education_settings)(buffer, offset)
          case "multiplayer_settings": return (ctx.packet_multiplayer_settings)(buffer, offset)
          case "settings_command": return (ctx.packet_settings_command)(buffer, offset)
          case "anvil_damage": return (ctx.packet_anvil_damage)(buffer, offset)
          case "completed_using_item": return (ctx.packet_completed_using_item)(buffer, offset)
          case "network_settings": return (ctx.packet_network_settings)(buffer, offset)
          case "player_auth_input": return (ctx.packet_player_auth_input)(buffer, offset)
          case "creative_content": return (ctx.packet_creative_content)(buffer, offset)
          case "player_enchant_options": return (ctx.packet_player_enchant_options)(buffer, offset)
          case "item_stack_request": return (ctx.packet_item_stack_request)(buffer, offset)
          case "item_stack_response": return (ctx.packet_item_stack_response)(buffer, offset)
          case "player_armor_damage": return (ctx.packet_player_armor_damage)(buffer, offset)
          case "update_player_game_type": return (ctx.packet_update_player_game_type)(buffer, offset)
          case "position_tracking_db_request": return (ctx.packet_position_tracking_db_request)(buffer, offset)
          case "position_tracking_db_broadcast": return (ctx.packet_position_tracking_db_broadcast)(buffer, offset)
          case "packet_violation_warning": return (ctx.packet_packet_violation_warning)(buffer, offset)
          case "motion_prediction_hints": return (ctx.packet_motion_prediction_hints)(buffer, offset)
          case "animate_entity": return (ctx.packet_animate_entity)(buffer, offset)
          case "camera_shake": return (ctx.packet_camera_shake)(buffer, offset)
          case "player_fog": return (ctx.packet_player_fog)(buffer, offset)
          case "correct_player_move_prediction": return (ctx.packet_correct_player_move_prediction)(buffer, offset)
          case "item_component": return (ctx.packet_item_component)(buffer, offset)
          case "filter_text_packet": return (ctx.packet_filter_text_packet)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + nameSize)
      return { value: { name, params }, size: nameSize + paramsSize}
    },
    packet_login: (buffer, offset) => {
      let { value: protocol_version, size: protocol_versionSize } = (ctx.i32)(buffer, offset)
      let { value: tokens, size: tokensSize } = ((buffer, offset) => {
        const payloadSize = (ctx.varint)(buffer, offset)
          const { value, size } = ctx.LoginTokens(buffer, offset + payloadSize.size)
          return { value, size: size + payloadSize.size }
      })(buffer, offset + protocol_versionSize)
      return { value: { protocol_version, tokens }, size: protocol_versionSize + tokensSize}
    },
    LoginTokens: (buffer, offset) => {
      let { value: identity, size: identitySize } = (ctx.LittleString)(buffer, offset)
      let { value: client, size: clientSize } = (ctx.LittleString)(buffer, offset + identitySize)
      return { value: { identity, client }, size: identitySize + clientSize}
    },
    packet_play_status: (buffer, offset) => {
      let { value: status, size: statusSize } = ((buffer, offset) => {
        const { value, size } = (ctx.i32)(buffer, offset)
        return { value: {"0":"login_success","1":"failed_client","2":"failed_spawn","3":"player_spawn","4":"failed_invalid_tenant","5":"failed_vanilla_edu","6":"failed_edu_vanilla","7":"failed_server_full"}[value] || value, size }
      })(buffer, offset)
      return { value: { status }, size: statusSize}
    },
    packet_server_to_client_handshake: (buffer, offset) => {
      let { value: token, size: tokenSize } = (ctx.string)(buffer, offset)
      return { value: { token }, size: tokenSize}
    },
    packet_client_to_server_handshake: (buffer, offset) => {
      return { value: {  }, size: 0}
    },
    packet_disconnect: (buffer, offset) => {
      let { value: hide_disconnect_reason, size: hide_disconnect_reasonSize } = (ctx.bool)(buffer, offset)
      let { value: message, size: messageSize } = (ctx.string)(buffer, offset + hide_disconnect_reasonSize)
      return { value: { hide_disconnect_reason, message }, size: hide_disconnect_reasonSize + messageSize}
    },
    packet_resource_packs_info: (buffer, offset) => {
      let { value: must_accept, size: must_acceptSize } = (ctx.bool)(buffer, offset)
      let { value: has_scripts, size: has_scriptsSize } = (ctx.bool)(buffer, offset + must_acceptSize)
      let { value: behaviour_packs, size: behaviour_packsSize } = (ctx.BehaviourPackInfos)(buffer, offset + must_acceptSize + has_scriptsSize)
      let { value: texture_packs, size: texture_packsSize } = (ctx.TexturePackInfos)(buffer, offset + must_acceptSize + has_scriptsSize + behaviour_packsSize)
      return { value: { must_accept, has_scripts, behaviour_packs, texture_packs }, size: must_acceptSize + has_scriptsSize + behaviour_packsSize + texture_packsSize}
    },
    packet_resource_pack_stack: (buffer, offset) => {
      let { value: must_accept, size: must_acceptSize } = (ctx.bool)(buffer, offset)
      let { value: behavior_packs, size: behavior_packsSize } = (ctx.ResourcePackIdVersions)(buffer, offset + must_acceptSize)
      let { value: resource_packs, size: resource_packsSize } = (ctx.ResourcePackIdVersions)(buffer, offset + must_acceptSize + behavior_packsSize)
      let { value: game_version, size: game_versionSize } = (ctx.string)(buffer, offset + must_acceptSize + behavior_packsSize + resource_packsSize)
      let { value: experiments, size: experimentsSize } = (ctx.Experiments)(buffer, offset + must_acceptSize + behavior_packsSize + resource_packsSize + game_versionSize)
      let { value: experiments_previously_used, size: experiments_previously_usedSize } = (ctx.bool)(buffer, offset + must_acceptSize + behavior_packsSize + resource_packsSize + game_versionSize + experimentsSize)
      return { value: { must_accept, behavior_packs, resource_packs, game_version, experiments, experiments_previously_used }, size: must_acceptSize + behavior_packsSize + resource_packsSize + game_versionSize + experimentsSize + experiments_previously_usedSize}
    },
    packet_resource_pack_client_response: (buffer, offset) => {
      let { value: response_status, size: response_statusSize } = ((buffer, offset) => {
        const { value, size } = (ctx.u8)(buffer, offset)
        return { value: {"0":"none","1":"refused","2":"send_packs","3":"have_all_packs","4":"completed"}[value] || value, size }
      })(buffer, offset)
      let { value: resourcepackids, size: resourcepackidsSize } = (ctx.ResourcePackIds)(buffer, offset + response_statusSize)
      return { value: { response_status, resourcepackids }, size: response_statusSize + resourcepackidsSize}
    },
    packet_text: (buffer, offset) => {
      let { value: type, size: typeSize } = ((buffer, offset) => {
        const { value, size } = (ctx.u8)(buffer, offset)
        return { value: {"0":"raw","1":"chat","2":"translation","3":"popup","4":"jukebox_popup","5":"tip","6":"system","7":"whisper","8":"announcement","9":"json_whisper","10":"json"}[value] || value, size }
      })(buffer, offset)
      let { value: needs_translation, size: needs_translationSize } = (ctx.bool)(buffer, offset + typeSize)
      let { value: source_name, size: source_nameSize } = ((buffer, offset) => {
        switch (type) {
          case "chat": return (ctx.string)(buffer, offset)
          case "whisper": return (ctx.string)(buffer, offset)
          case "announcement": return (ctx.string)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + typeSize + needs_translationSize)
      let { value: message, size: messageSize } = ((buffer, offset) => {
        switch (type) {
          case "chat": return (ctx.string)(buffer, offset)
          case "whisper": return (ctx.string)(buffer, offset)
          case "announcement": return (ctx.string)(buffer, offset)
          case "raw": return (ctx.string)(buffer, offset)
          case "tip": return (ctx.string)(buffer, offset)
          case "system": return (ctx.string)(buffer, offset)
          case "json_whisper": return (ctx.string)(buffer, offset)
          case "json": return (ctx.string)(buffer, offset)
          case "translation": return (ctx.string)(buffer, offset)
          case "popup": return (ctx.string)(buffer, offset)
          case "jukebox_popup": return (ctx.string)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + typeSize + needs_translationSize + source_nameSize)
      let { value: paramaters, size: paramatersSize } = ((buffer, offset) => {
        switch (type) {
          case "translation": return ((buffer, offset) => {
            const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
            if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
            const data = []
            let size = countSize
            for (let i = 0; i < count; i++) {
              const elem = (ctx.string)(buffer, offset + size)
              data.push(elem.value)
              size += elem.size
            }
            return { value: data, size }
          })(buffer, offset)
          case "popup": return ((buffer, offset) => {
            const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
            if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
            const data = []
            let size = countSize
            for (let i = 0; i < count; i++) {
              const elem = (ctx.string)(buffer, offset + size)
              data.push(elem.value)
              size += elem.size
            }
            return { value: data, size }
          })(buffer, offset)
          case "jukebox_popup": return ((buffer, offset) => {
            const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
            if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
            const data = []
            let size = countSize
            for (let i = 0; i < count; i++) {
              const elem = (ctx.string)(buffer, offset + size)
              data.push(elem.value)
              size += elem.size
            }
            return { value: data, size }
          })(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + typeSize + needs_translationSize + source_nameSize + messageSize)
      let { value: xuid, size: xuidSize } = (ctx.string)(buffer, offset + typeSize + needs_translationSize + source_nameSize + messageSize + paramatersSize)
      let { value: platform_chat_id, size: platform_chat_idSize } = (ctx.string)(buffer, offset + typeSize + needs_translationSize + source_nameSize + messageSize + paramatersSize + xuidSize)
      return { value: { type, needs_translation, source_name, message, paramaters, xuid, platform_chat_id }, size: typeSize + needs_translationSize + source_nameSize + messageSize + paramatersSize + xuidSize + platform_chat_idSize}
    },
    packet_set_time: (buffer, offset) => {
      let { value: time, size: timeSize } = (ctx.zigzag32)(buffer, offset)
      return { value: { time }, size: timeSize}
    },
    packet_start_game: (buffer, offset) => {
      let { value: entity_id, size: entity_idSize } = (ctx.zigzag64)(buffer, offset)
      let { value: runtime_entity_id, size: runtime_entity_idSize } = (ctx.varint64)(buffer, offset + entity_idSize)
      let { value: player_gamemode, size: player_gamemodeSize } = (ctx.GameMode)(buffer, offset + entity_idSize + runtime_entity_idSize)
      let { value: spawn, size: spawnSize } = (ctx.vec3f)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize)
      let { value: rotation, size: rotationSize } = (ctx.vec2f)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + spawnSize)
      let { value: seed, size: seedSize } = (ctx.zigzag32)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + spawnSize + rotationSize)
      let { value: biome_type, size: biome_typeSize } = (ctx.li16)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + spawnSize + rotationSize + seedSize)
      let { value: biome_name, size: biome_nameSize } = (ctx.string)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + spawnSize + rotationSize + seedSize + biome_typeSize)
      let { value: dimension, size: dimensionSize } = (ctx.zigzag32)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + spawnSize + rotationSize + seedSize + biome_typeSize + biome_nameSize)
      let { value: generator, size: generatorSize } = (ctx.zigzag32)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + spawnSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize)
      let { value: world_gamemode, size: world_gamemodeSize } = (ctx.GameMode)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + spawnSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize)
      let { value: difficulty, size: difficultySize } = (ctx.zigzag32)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + spawnSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize)
      let { value: spawn_position, size: spawn_positionSize } = (ctx.BlockCoordinates)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + spawnSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize)
      let { value: achievements_disabled, size: achievements_disabledSize } = (ctx.bool)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + spawnSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize)
      let { value: day_cycle_stop_time, size: day_cycle_stop_timeSize } = (ctx.zigzag32)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + spawnSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize)
      let { value: edu_offer, size: edu_offerSize } = (ctx.zigzag32)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + spawnSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + day_cycle_stop_timeSize)
      let { value: edu_features_enabled, size: edu_features_enabledSize } = (ctx.bool)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + spawnSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + day_cycle_stop_timeSize + edu_offerSize)
      let { value: edu_product_uuid, size: edu_product_uuidSize } = (ctx.string)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + spawnSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize)
      let { value: rain_level, size: rain_levelSize } = (ctx.lf32)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + spawnSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize)
      let { value: lightning_level, size: lightning_levelSize } = (ctx.lf32)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + spawnSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize)
      let { value: has_confirmed_platform_locked_content, size: has_confirmed_platform_locked_contentSize } = (ctx.bool)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + spawnSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize)
      let { value: is_multiplayer, size: is_multiplayerSize } = (ctx.bool)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + spawnSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize)
      let { value: broadcast_to_lan, size: broadcast_to_lanSize } = (ctx.bool)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + spawnSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize)
      let { value: xbox_live_broadcast_mode, size: xbox_live_broadcast_modeSize } = (ctx.varint)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + spawnSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize)
      let { value: platform_broadcast_mode, size: platform_broadcast_modeSize } = (ctx.varint)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + spawnSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize)
      let { value: enable_commands, size: enable_commandsSize } = (ctx.bool)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + spawnSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize)
      let { value: is_texturepacks_required, size: is_texturepacks_requiredSize } = (ctx.bool)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + spawnSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize)
      let { value: gamerules, size: gamerulesSize } = (ctx.GameRules)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + spawnSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize)
      let { value: experiments, size: experimentsSize } = (ctx.Experiments)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + spawnSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize)
      let { value: experiments_previously_used, size: experiments_previously_usedSize } = (ctx.bool)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + spawnSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize)
      let { value: bonus_chest, size: bonus_chestSize } = (ctx.bool)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + spawnSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize + experiments_previously_usedSize)
      let { value: map_enabled, size: map_enabledSize } = (ctx.bool)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + spawnSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize + experiments_previously_usedSize + bonus_chestSize)
      let { value: permission_level, size: permission_levelSize } = (ctx.zigzag32)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + spawnSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize + experiments_previously_usedSize + bonus_chestSize + map_enabledSize)
      let { value: server_chunk_tick_range, size: server_chunk_tick_rangeSize } = (ctx.li32)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + spawnSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize + experiments_previously_usedSize + bonus_chestSize + map_enabledSize + permission_levelSize)
      let { value: has_locked_behavior_pack, size: has_locked_behavior_packSize } = (ctx.bool)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + spawnSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize + experiments_previously_usedSize + bonus_chestSize + map_enabledSize + permission_levelSize + server_chunk_tick_rangeSize)
      let { value: has_locked_resource_pack, size: has_locked_resource_packSize } = (ctx.bool)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + spawnSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize + experiments_previously_usedSize + bonus_chestSize + map_enabledSize + permission_levelSize + server_chunk_tick_rangeSize + has_locked_behavior_packSize)
      let { value: is_from_locked_world_template, size: is_from_locked_world_templateSize } = (ctx.bool)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + spawnSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize + experiments_previously_usedSize + bonus_chestSize + map_enabledSize + permission_levelSize + server_chunk_tick_rangeSize + has_locked_behavior_packSize + has_locked_resource_packSize)
      let { value: msa_gamertags_only, size: msa_gamertags_onlySize } = (ctx.bool)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + spawnSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize + experiments_previously_usedSize + bonus_chestSize + map_enabledSize + permission_levelSize + server_chunk_tick_rangeSize + has_locked_behavior_packSize + has_locked_resource_packSize + is_from_locked_world_templateSize)
      let { value: is_from_world_template, size: is_from_world_templateSize } = (ctx.bool)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + spawnSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize + experiments_previously_usedSize + bonus_chestSize + map_enabledSize + permission_levelSize + server_chunk_tick_rangeSize + has_locked_behavior_packSize + has_locked_resource_packSize + is_from_locked_world_templateSize + msa_gamertags_onlySize)
      let { value: is_world_template_option_locked, size: is_world_template_option_lockedSize } = (ctx.bool)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + spawnSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize + experiments_previously_usedSize + bonus_chestSize + map_enabledSize + permission_levelSize + server_chunk_tick_rangeSize + has_locked_behavior_packSize + has_locked_resource_packSize + is_from_locked_world_templateSize + msa_gamertags_onlySize + is_from_world_templateSize)
      let { value: only_spawn_v1_villagers, size: only_spawn_v1_villagersSize } = (ctx.bool)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + spawnSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize + experiments_previously_usedSize + bonus_chestSize + map_enabledSize + permission_levelSize + server_chunk_tick_rangeSize + has_locked_behavior_packSize + has_locked_resource_packSize + is_from_locked_world_templateSize + msa_gamertags_onlySize + is_from_world_templateSize + is_world_template_option_lockedSize)
      let { value: game_version, size: game_versionSize } = (ctx.string)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + spawnSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize + experiments_previously_usedSize + bonus_chestSize + map_enabledSize + permission_levelSize + server_chunk_tick_rangeSize + has_locked_behavior_packSize + has_locked_resource_packSize + is_from_locked_world_templateSize + msa_gamertags_onlySize + is_from_world_templateSize + is_world_template_option_lockedSize + only_spawn_v1_villagersSize)
      let { value: limited_world_width, size: limited_world_widthSize } = (ctx.li32)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + spawnSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize + experiments_previously_usedSize + bonus_chestSize + map_enabledSize + permission_levelSize + server_chunk_tick_rangeSize + has_locked_behavior_packSize + has_locked_resource_packSize + is_from_locked_world_templateSize + msa_gamertags_onlySize + is_from_world_templateSize + is_world_template_option_lockedSize + only_spawn_v1_villagersSize + game_versionSize)
      let { value: limited_world_length, size: limited_world_lengthSize } = (ctx.li32)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + spawnSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize + experiments_previously_usedSize + bonus_chestSize + map_enabledSize + permission_levelSize + server_chunk_tick_rangeSize + has_locked_behavior_packSize + has_locked_resource_packSize + is_from_locked_world_templateSize + msa_gamertags_onlySize + is_from_world_templateSize + is_world_template_option_lockedSize + only_spawn_v1_villagersSize + game_versionSize + limited_world_widthSize)
      let { value: is_new_nether, size: is_new_netherSize } = (ctx.bool)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + spawnSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize + experiments_previously_usedSize + bonus_chestSize + map_enabledSize + permission_levelSize + server_chunk_tick_rangeSize + has_locked_behavior_packSize + has_locked_resource_packSize + is_from_locked_world_templateSize + msa_gamertags_onlySize + is_from_world_templateSize + is_world_template_option_lockedSize + only_spawn_v1_villagersSize + game_versionSize + limited_world_widthSize + limited_world_lengthSize)
      let { value: experimental_gameplay_override, size: experimental_gameplay_overrideSize } = (ctx.bool)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + spawnSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize + experiments_previously_usedSize + bonus_chestSize + map_enabledSize + permission_levelSize + server_chunk_tick_rangeSize + has_locked_behavior_packSize + has_locked_resource_packSize + is_from_locked_world_templateSize + msa_gamertags_onlySize + is_from_world_templateSize + is_world_template_option_lockedSize + only_spawn_v1_villagersSize + game_versionSize + limited_world_widthSize + limited_world_lengthSize + is_new_netherSize)
      let { value: level_id, size: level_idSize } = (ctx.string)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + spawnSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize + experiments_previously_usedSize + bonus_chestSize + map_enabledSize + permission_levelSize + server_chunk_tick_rangeSize + has_locked_behavior_packSize + has_locked_resource_packSize + is_from_locked_world_templateSize + msa_gamertags_onlySize + is_from_world_templateSize + is_world_template_option_lockedSize + only_spawn_v1_villagersSize + game_versionSize + limited_world_widthSize + limited_world_lengthSize + is_new_netherSize + experimental_gameplay_overrideSize)
      let { value: world_name, size: world_nameSize } = (ctx.string)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + spawnSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize + experiments_previously_usedSize + bonus_chestSize + map_enabledSize + permission_levelSize + server_chunk_tick_rangeSize + has_locked_behavior_packSize + has_locked_resource_packSize + is_from_locked_world_templateSize + msa_gamertags_onlySize + is_from_world_templateSize + is_world_template_option_lockedSize + only_spawn_v1_villagersSize + game_versionSize + limited_world_widthSize + limited_world_lengthSize + is_new_netherSize + experimental_gameplay_overrideSize + level_idSize)
      let { value: premium_world_template_id, size: premium_world_template_idSize } = (ctx.string)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + spawnSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize + experiments_previously_usedSize + bonus_chestSize + map_enabledSize + permission_levelSize + server_chunk_tick_rangeSize + has_locked_behavior_packSize + has_locked_resource_packSize + is_from_locked_world_templateSize + msa_gamertags_onlySize + is_from_world_templateSize + is_world_template_option_lockedSize + only_spawn_v1_villagersSize + game_versionSize + limited_world_widthSize + limited_world_lengthSize + is_new_netherSize + experimental_gameplay_overrideSize + level_idSize + world_nameSize)
      let { value: is_trial, size: is_trialSize } = (ctx.bool)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + spawnSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize + experiments_previously_usedSize + bonus_chestSize + map_enabledSize + permission_levelSize + server_chunk_tick_rangeSize + has_locked_behavior_packSize + has_locked_resource_packSize + is_from_locked_world_templateSize + msa_gamertags_onlySize + is_from_world_templateSize + is_world_template_option_lockedSize + only_spawn_v1_villagersSize + game_versionSize + limited_world_widthSize + limited_world_lengthSize + is_new_netherSize + experimental_gameplay_overrideSize + level_idSize + world_nameSize + premium_world_template_idSize)
      let { value: movement_authority, size: movement_authoritySize } = ((buffer, offset) => {
        const { value, size } = (ctx.zigzag32)(buffer, offset)
        return { value: {"0":"client","1":"server","2":"server_v2_rewind"}[value] || value, size }
      })(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + spawnSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize + experiments_previously_usedSize + bonus_chestSize + map_enabledSize + permission_levelSize + server_chunk_tick_rangeSize + has_locked_behavior_packSize + has_locked_resource_packSize + is_from_locked_world_templateSize + msa_gamertags_onlySize + is_from_world_templateSize + is_world_template_option_lockedSize + only_spawn_v1_villagersSize + game_versionSize + limited_world_widthSize + limited_world_lengthSize + is_new_netherSize + experimental_gameplay_overrideSize + level_idSize + world_nameSize + premium_world_template_idSize + is_trialSize)
      let { value: current_tick, size: current_tickSize } = (ctx.li64)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + spawnSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize + experiments_previously_usedSize + bonus_chestSize + map_enabledSize + permission_levelSize + server_chunk_tick_rangeSize + has_locked_behavior_packSize + has_locked_resource_packSize + is_from_locked_world_templateSize + msa_gamertags_onlySize + is_from_world_templateSize + is_world_template_option_lockedSize + only_spawn_v1_villagersSize + game_versionSize + limited_world_widthSize + limited_world_lengthSize + is_new_netherSize + experimental_gameplay_overrideSize + level_idSize + world_nameSize + premium_world_template_idSize + is_trialSize + movement_authoritySize)
      let { value: enchantment_seed, size: enchantment_seedSize } = (ctx.zigzag32)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + spawnSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize + experiments_previously_usedSize + bonus_chestSize + map_enabledSize + permission_levelSize + server_chunk_tick_rangeSize + has_locked_behavior_packSize + has_locked_resource_packSize + is_from_locked_world_templateSize + msa_gamertags_onlySize + is_from_world_templateSize + is_world_template_option_lockedSize + only_spawn_v1_villagersSize + game_versionSize + limited_world_widthSize + limited_world_lengthSize + is_new_netherSize + experimental_gameplay_overrideSize + level_idSize + world_nameSize + premium_world_template_idSize + is_trialSize + movement_authoritySize + current_tickSize)
      let { value: block_palette, size: block_paletteSize } = (ctx.BlockPalette)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + spawnSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize + experiments_previously_usedSize + bonus_chestSize + map_enabledSize + permission_levelSize + server_chunk_tick_rangeSize + has_locked_behavior_packSize + has_locked_resource_packSize + is_from_locked_world_templateSize + msa_gamertags_onlySize + is_from_world_templateSize + is_world_template_option_lockedSize + only_spawn_v1_villagersSize + game_versionSize + limited_world_widthSize + limited_world_lengthSize + is_new_netherSize + experimental_gameplay_overrideSize + level_idSize + world_nameSize + premium_world_template_idSize + is_trialSize + movement_authoritySize + current_tickSize + enchantment_seedSize)
      let { value: itemstates, size: itemstatesSize } = (ctx.Itemstates)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + spawnSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize + experiments_previously_usedSize + bonus_chestSize + map_enabledSize + permission_levelSize + server_chunk_tick_rangeSize + has_locked_behavior_packSize + has_locked_resource_packSize + is_from_locked_world_templateSize + msa_gamertags_onlySize + is_from_world_templateSize + is_world_template_option_lockedSize + only_spawn_v1_villagersSize + game_versionSize + limited_world_widthSize + limited_world_lengthSize + is_new_netherSize + experimental_gameplay_overrideSize + level_idSize + world_nameSize + premium_world_template_idSize + is_trialSize + movement_authoritySize + current_tickSize + enchantment_seedSize + block_paletteSize)
      let { value: multiplayer_correlation_id, size: multiplayer_correlation_idSize } = (ctx.string)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + spawnSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize + experiments_previously_usedSize + bonus_chestSize + map_enabledSize + permission_levelSize + server_chunk_tick_rangeSize + has_locked_behavior_packSize + has_locked_resource_packSize + is_from_locked_world_templateSize + msa_gamertags_onlySize + is_from_world_templateSize + is_world_template_option_lockedSize + only_spawn_v1_villagersSize + game_versionSize + limited_world_widthSize + limited_world_lengthSize + is_new_netherSize + experimental_gameplay_overrideSize + level_idSize + world_nameSize + premium_world_template_idSize + is_trialSize + movement_authoritySize + current_tickSize + enchantment_seedSize + block_paletteSize + itemstatesSize)
      let { value: server_authoritative_inventory, size: server_authoritative_inventorySize } = (ctx.bool)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + spawnSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize + experiments_previously_usedSize + bonus_chestSize + map_enabledSize + permission_levelSize + server_chunk_tick_rangeSize + has_locked_behavior_packSize + has_locked_resource_packSize + is_from_locked_world_templateSize + msa_gamertags_onlySize + is_from_world_templateSize + is_world_template_option_lockedSize + only_spawn_v1_villagersSize + game_versionSize + limited_world_widthSize + limited_world_lengthSize + is_new_netherSize + experimental_gameplay_overrideSize + level_idSize + world_nameSize + premium_world_template_idSize + is_trialSize + movement_authoritySize + current_tickSize + enchantment_seedSize + block_paletteSize + itemstatesSize + multiplayer_correlation_idSize)
      return { value: { entity_id, runtime_entity_id, player_gamemode, spawn, rotation, seed, biome_type, biome_name, dimension, generator, world_gamemode, difficulty, spawn_position, achievements_disabled, day_cycle_stop_time, edu_offer, edu_features_enabled, edu_product_uuid, rain_level, lightning_level, has_confirmed_platform_locked_content, is_multiplayer, broadcast_to_lan, xbox_live_broadcast_mode, platform_broadcast_mode, enable_commands, is_texturepacks_required, gamerules, experiments, experiments_previously_used, bonus_chest, map_enabled, permission_level, server_chunk_tick_range, has_locked_behavior_pack, has_locked_resource_pack, is_from_locked_world_template, msa_gamertags_only, is_from_world_template, is_world_template_option_locked, only_spawn_v1_villagers, game_version, limited_world_width, limited_world_length, is_new_nether, experimental_gameplay_override, level_id, world_name, premium_world_template_id, is_trial, movement_authority, current_tick, enchantment_seed, block_palette, itemstates, multiplayer_correlation_id, server_authoritative_inventory }, size: entity_idSize + runtime_entity_idSize + player_gamemodeSize + spawnSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize + experiments_previously_usedSize + bonus_chestSize + map_enabledSize + permission_levelSize + server_chunk_tick_rangeSize + has_locked_behavior_packSize + has_locked_resource_packSize + is_from_locked_world_templateSize + msa_gamertags_onlySize + is_from_world_templateSize + is_world_template_option_lockedSize + only_spawn_v1_villagersSize + game_versionSize + limited_world_widthSize + limited_world_lengthSize + is_new_netherSize + experimental_gameplay_overrideSize + level_idSize + world_nameSize + premium_world_template_idSize + is_trialSize + movement_authoritySize + current_tickSize + enchantment_seedSize + block_paletteSize + itemstatesSize + multiplayer_correlation_idSize + server_authoritative_inventorySize}
    },
    packet_add_player: (buffer, offset) => {
      let { value: uuid, size: uuidSize } = (ctx.uuid)(buffer, offset)
      let { value: username, size: usernameSize } = (ctx.string)(buffer, offset + uuidSize)
      let { value: entity_id_self, size: entity_id_selfSize } = (ctx.zigzag64)(buffer, offset + uuidSize + usernameSize)
      let { value: runtime_entity_id, size: runtime_entity_idSize } = (ctx.varint)(buffer, offset + uuidSize + usernameSize + entity_id_selfSize)
      let { value: platform_chat_id, size: platform_chat_idSize } = (ctx.string)(buffer, offset + uuidSize + usernameSize + entity_id_selfSize + runtime_entity_idSize)
      let { value: x, size: xSize } = (ctx.lf32)(buffer, offset + uuidSize + usernameSize + entity_id_selfSize + runtime_entity_idSize + platform_chat_idSize)
      let { value: y, size: ySize } = (ctx.lf32)(buffer, offset + uuidSize + usernameSize + entity_id_selfSize + runtime_entity_idSize + platform_chat_idSize + xSize)
      let { value: z, size: zSize } = (ctx.lf32)(buffer, offset + uuidSize + usernameSize + entity_id_selfSize + runtime_entity_idSize + platform_chat_idSize + xSize + ySize)
      let { value: speed_x, size: speed_xSize } = (ctx.lf32)(buffer, offset + uuidSize + usernameSize + entity_id_selfSize + runtime_entity_idSize + platform_chat_idSize + xSize + ySize + zSize)
      let { value: speed_y, size: speed_ySize } = (ctx.lf32)(buffer, offset + uuidSize + usernameSize + entity_id_selfSize + runtime_entity_idSize + platform_chat_idSize + xSize + ySize + zSize + speed_xSize)
      let { value: speed_z, size: speed_zSize } = (ctx.lf32)(buffer, offset + uuidSize + usernameSize + entity_id_selfSize + runtime_entity_idSize + platform_chat_idSize + xSize + ySize + zSize + speed_xSize + speed_ySize)
      let { value: pitch, size: pitchSize } = (ctx.lf32)(buffer, offset + uuidSize + usernameSize + entity_id_selfSize + runtime_entity_idSize + platform_chat_idSize + xSize + ySize + zSize + speed_xSize + speed_ySize + speed_zSize)
      let { value: yaw, size: yawSize } = (ctx.lf32)(buffer, offset + uuidSize + usernameSize + entity_id_selfSize + runtime_entity_idSize + platform_chat_idSize + xSize + ySize + zSize + speed_xSize + speed_ySize + speed_zSize + pitchSize)
      let { value: head_yaw, size: head_yawSize } = (ctx.lf32)(buffer, offset + uuidSize + usernameSize + entity_id_selfSize + runtime_entity_idSize + platform_chat_idSize + xSize + ySize + zSize + speed_xSize + speed_ySize + speed_zSize + pitchSize + yawSize)
      let { value: held_item, size: held_itemSize } = (ctx.Item)(buffer, offset + uuidSize + usernameSize + entity_id_selfSize + runtime_entity_idSize + platform_chat_idSize + xSize + ySize + zSize + speed_xSize + speed_ySize + speed_zSize + pitchSize + yawSize + head_yawSize)
      let { value: metadata, size: metadataSize } = (ctx.MetadataDictionary)(buffer, offset + uuidSize + usernameSize + entity_id_selfSize + runtime_entity_idSize + platform_chat_idSize + xSize + ySize + zSize + speed_xSize + speed_ySize + speed_zSize + pitchSize + yawSize + head_yawSize + held_itemSize)
      let { value: flags, size: flagsSize } = (ctx.varint)(buffer, offset + uuidSize + usernameSize + entity_id_selfSize + runtime_entity_idSize + platform_chat_idSize + xSize + ySize + zSize + speed_xSize + speed_ySize + speed_zSize + pitchSize + yawSize + head_yawSize + held_itemSize + metadataSize)
      let { value: command_permission, size: command_permissionSize } = (ctx.varint)(buffer, offset + uuidSize + usernameSize + entity_id_selfSize + runtime_entity_idSize + platform_chat_idSize + xSize + ySize + zSize + speed_xSize + speed_ySize + speed_zSize + pitchSize + yawSize + head_yawSize + held_itemSize + metadataSize + flagsSize)
      let { value: action_permissions, size: action_permissionsSize } = (ctx.varint)(buffer, offset + uuidSize + usernameSize + entity_id_selfSize + runtime_entity_idSize + platform_chat_idSize + xSize + ySize + zSize + speed_xSize + speed_ySize + speed_zSize + pitchSize + yawSize + head_yawSize + held_itemSize + metadataSize + flagsSize + command_permissionSize)
      let { value: permission_level, size: permission_levelSize } = (ctx.varint)(buffer, offset + uuidSize + usernameSize + entity_id_selfSize + runtime_entity_idSize + platform_chat_idSize + xSize + ySize + zSize + speed_xSize + speed_ySize + speed_zSize + pitchSize + yawSize + head_yawSize + held_itemSize + metadataSize + flagsSize + command_permissionSize + action_permissionsSize)
      let { value: custom_stored_permissions, size: custom_stored_permissionsSize } = (ctx.varint)(buffer, offset + uuidSize + usernameSize + entity_id_selfSize + runtime_entity_idSize + platform_chat_idSize + xSize + ySize + zSize + speed_xSize + speed_ySize + speed_zSize + pitchSize + yawSize + head_yawSize + held_itemSize + metadataSize + flagsSize + command_permissionSize + action_permissionsSize + permission_levelSize)
      let { value: user_id, size: user_idSize } = (ctx.li64)(buffer, offset + uuidSize + usernameSize + entity_id_selfSize + runtime_entity_idSize + platform_chat_idSize + xSize + ySize + zSize + speed_xSize + speed_ySize + speed_zSize + pitchSize + yawSize + head_yawSize + held_itemSize + metadataSize + flagsSize + command_permissionSize + action_permissionsSize + permission_levelSize + custom_stored_permissionsSize)
      let { value: links, size: linksSize } = (ctx.Links)(buffer, offset + uuidSize + usernameSize + entity_id_selfSize + runtime_entity_idSize + platform_chat_idSize + xSize + ySize + zSize + speed_xSize + speed_ySize + speed_zSize + pitchSize + yawSize + head_yawSize + held_itemSize + metadataSize + flagsSize + command_permissionSize + action_permissionsSize + permission_levelSize + custom_stored_permissionsSize + user_idSize)
      let { value: device_id, size: device_idSize } = (ctx.string)(buffer, offset + uuidSize + usernameSize + entity_id_selfSize + runtime_entity_idSize + platform_chat_idSize + xSize + ySize + zSize + speed_xSize + speed_ySize + speed_zSize + pitchSize + yawSize + head_yawSize + held_itemSize + metadataSize + flagsSize + command_permissionSize + action_permissionsSize + permission_levelSize + custom_stored_permissionsSize + user_idSize + linksSize)
      let { value: device_os, size: device_osSize } = (ctx.li32)(buffer, offset + uuidSize + usernameSize + entity_id_selfSize + runtime_entity_idSize + platform_chat_idSize + xSize + ySize + zSize + speed_xSize + speed_ySize + speed_zSize + pitchSize + yawSize + head_yawSize + held_itemSize + metadataSize + flagsSize + command_permissionSize + action_permissionsSize + permission_levelSize + custom_stored_permissionsSize + user_idSize + linksSize + device_idSize)
      return { value: { uuid, username, entity_id_self, runtime_entity_id, platform_chat_id, x, y, z, speed_x, speed_y, speed_z, pitch, yaw, head_yaw, held_item, metadata, flags, command_permission, action_permissions, permission_level, custom_stored_permissions, user_id, links, device_id, device_os }, size: uuidSize + usernameSize + entity_id_selfSize + runtime_entity_idSize + platform_chat_idSize + xSize + ySize + zSize + speed_xSize + speed_ySize + speed_zSize + pitchSize + yawSize + head_yawSize + held_itemSize + metadataSize + flagsSize + command_permissionSize + action_permissionsSize + permission_levelSize + custom_stored_permissionsSize + user_idSize + linksSize + device_idSize + device_osSize}
    },
    packet_add_entity: (buffer, offset) => {
      let { value: entity_id_self, size: entity_id_selfSize } = (ctx.zigzag64)(buffer, offset)
      let { value: runtime_entity_id, size: runtime_entity_idSize } = (ctx.varint)(buffer, offset + entity_id_selfSize)
      let { value: entity_type, size: entity_typeSize } = (ctx.string)(buffer, offset + entity_id_selfSize + runtime_entity_idSize)
      let { value: x, size: xSize } = (ctx.lf32)(buffer, offset + entity_id_selfSize + runtime_entity_idSize + entity_typeSize)
      let { value: y, size: ySize } = (ctx.lf32)(buffer, offset + entity_id_selfSize + runtime_entity_idSize + entity_typeSize + xSize)
      let { value: z, size: zSize } = (ctx.lf32)(buffer, offset + entity_id_selfSize + runtime_entity_idSize + entity_typeSize + xSize + ySize)
      let { value: speed_x, size: speed_xSize } = (ctx.lf32)(buffer, offset + entity_id_selfSize + runtime_entity_idSize + entity_typeSize + xSize + ySize + zSize)
      let { value: speed_y, size: speed_ySize } = (ctx.lf32)(buffer, offset + entity_id_selfSize + runtime_entity_idSize + entity_typeSize + xSize + ySize + zSize + speed_xSize)
      let { value: speed_z, size: speed_zSize } = (ctx.lf32)(buffer, offset + entity_id_selfSize + runtime_entity_idSize + entity_typeSize + xSize + ySize + zSize + speed_xSize + speed_ySize)
      let { value: pitch, size: pitchSize } = (ctx.lf32)(buffer, offset + entity_id_selfSize + runtime_entity_idSize + entity_typeSize + xSize + ySize + zSize + speed_xSize + speed_ySize + speed_zSize)
      let { value: yaw, size: yawSize } = (ctx.lf32)(buffer, offset + entity_id_selfSize + runtime_entity_idSize + entity_typeSize + xSize + ySize + zSize + speed_xSize + speed_ySize + speed_zSize + pitchSize)
      let { value: head_yaw, size: head_yawSize } = (ctx.lf32)(buffer, offset + entity_id_selfSize + runtime_entity_idSize + entity_typeSize + xSize + ySize + zSize + speed_xSize + speed_ySize + speed_zSize + pitchSize + yawSize)
      let { value: attributes, size: attributesSize } = (ctx.EntityAttributes)(buffer, offset + entity_id_selfSize + runtime_entity_idSize + entity_typeSize + xSize + ySize + zSize + speed_xSize + speed_ySize + speed_zSize + pitchSize + yawSize + head_yawSize)
      let { value: metadata, size: metadataSize } = (ctx.MetadataDictionary)(buffer, offset + entity_id_selfSize + runtime_entity_idSize + entity_typeSize + xSize + ySize + zSize + speed_xSize + speed_ySize + speed_zSize + pitchSize + yawSize + head_yawSize + attributesSize)
      let { value: links, size: linksSize } = (ctx.Links)(buffer, offset + entity_id_selfSize + runtime_entity_idSize + entity_typeSize + xSize + ySize + zSize + speed_xSize + speed_ySize + speed_zSize + pitchSize + yawSize + head_yawSize + attributesSize + metadataSize)
      return { value: { entity_id_self, runtime_entity_id, entity_type, x, y, z, speed_x, speed_y, speed_z, pitch, yaw, head_yaw, attributes, metadata, links }, size: entity_id_selfSize + runtime_entity_idSize + entity_typeSize + xSize + ySize + zSize + speed_xSize + speed_ySize + speed_zSize + pitchSize + yawSize + head_yawSize + attributesSize + metadataSize + linksSize}
    },
    packet_remove_entity: (buffer, offset) => {
      let { value: entity_id_self, size: entity_id_selfSize } = (ctx.zigzag64)(buffer, offset)
      return { value: { entity_id_self }, size: entity_id_selfSize}
    },
    packet_add_item_entity: (buffer, offset) => {
      let { value: entity_id_self, size: entity_id_selfSize } = (ctx.zigzag64)(buffer, offset)
      let { value: runtime_entity_id, size: runtime_entity_idSize } = (ctx.varint)(buffer, offset + entity_id_selfSize)
      let { value: item, size: itemSize } = (ctx.Item)(buffer, offset + entity_id_selfSize + runtime_entity_idSize)
      let { value: x, size: xSize } = (ctx.lf32)(buffer, offset + entity_id_selfSize + runtime_entity_idSize + itemSize)
      let { value: y, size: ySize } = (ctx.lf32)(buffer, offset + entity_id_selfSize + runtime_entity_idSize + itemSize + xSize)
      let { value: z, size: zSize } = (ctx.lf32)(buffer, offset + entity_id_selfSize + runtime_entity_idSize + itemSize + xSize + ySize)
      let { value: speed_x, size: speed_xSize } = (ctx.lf32)(buffer, offset + entity_id_selfSize + runtime_entity_idSize + itemSize + xSize + ySize + zSize)
      let { value: speed_y, size: speed_ySize } = (ctx.lf32)(buffer, offset + entity_id_selfSize + runtime_entity_idSize + itemSize + xSize + ySize + zSize + speed_xSize)
      let { value: speed_z, size: speed_zSize } = (ctx.lf32)(buffer, offset + entity_id_selfSize + runtime_entity_idSize + itemSize + xSize + ySize + zSize + speed_xSize + speed_ySize)
      let { value: metadata, size: metadataSize } = (ctx.MetadataDictionary)(buffer, offset + entity_id_selfSize + runtime_entity_idSize + itemSize + xSize + ySize + zSize + speed_xSize + speed_ySize + speed_zSize)
      let { value: is_from_fishing, size: is_from_fishingSize } = (ctx.bool)(buffer, offset + entity_id_selfSize + runtime_entity_idSize + itemSize + xSize + ySize + zSize + speed_xSize + speed_ySize + speed_zSize + metadataSize)
      return { value: { entity_id_self, runtime_entity_id, item, x, y, z, speed_x, speed_y, speed_z, metadata, is_from_fishing }, size: entity_id_selfSize + runtime_entity_idSize + itemSize + xSize + ySize + zSize + speed_xSize + speed_ySize + speed_zSize + metadataSize + is_from_fishingSize}
    },
    packet_take_item_entity: (buffer, offset) => {
      let { value: runtime_entity_id, size: runtime_entity_idSize } = (ctx.varint)(buffer, offset)
      let { value: target, size: targetSize } = (ctx.varint)(buffer, offset + runtime_entity_idSize)
      return { value: { runtime_entity_id, target }, size: runtime_entity_idSize + targetSize}
    },
    packet_move_entity: (buffer, offset) => {
      let { value: runtime_entity_id, size: runtime_entity_idSize } = (ctx.varint)(buffer, offset)
      let { value: flags, size: flagsSize } = (ctx.u8)(buffer, offset + runtime_entity_idSize)
      let { value: position, size: positionSize } = (ctx.vec3f)(buffer, offset + runtime_entity_idSize + flagsSize)
      let { value: rotation, size: rotationSize } = (ctx.Rotation)(buffer, offset + runtime_entity_idSize + flagsSize + positionSize)
      return { value: { runtime_entity_id, flags, position, rotation }, size: runtime_entity_idSize + flagsSize + positionSize + rotationSize}
    },
    packet_move_player: (buffer, offset) => {
      let { value: runtime_id, size: runtime_idSize } = (ctx.varint)(buffer, offset)
      let { value: position, size: positionSize } = (ctx.vec3f)(buffer, offset + runtime_idSize)
      let { value: pitch, size: pitchSize } = (ctx.lf32)(buffer, offset + runtime_idSize + positionSize)
      let { value: yaw, size: yawSize } = (ctx.lf32)(buffer, offset + runtime_idSize + positionSize + pitchSize)
      let { value: head_yaw, size: head_yawSize } = (ctx.lf32)(buffer, offset + runtime_idSize + positionSize + pitchSize + yawSize)
      let { value: mode, size: modeSize } = ((buffer, offset) => {
        const { value, size } = (ctx.u8)(buffer, offset)
        return { value: {"0":"normal","1":"reset","2":"teleport","3":"rotation"}[value] || value, size }
      })(buffer, offset + runtime_idSize + positionSize + pitchSize + yawSize + head_yawSize)
      let { value: on_ground, size: on_groundSize } = (ctx.bool)(buffer, offset + runtime_idSize + positionSize + pitchSize + yawSize + head_yawSize + modeSize)
      let { value: ridden_runtime_id, size: ridden_runtime_idSize } = (ctx.varint)(buffer, offset + runtime_idSize + positionSize + pitchSize + yawSize + head_yawSize + modeSize + on_groundSize)
      let { value: teleport, size: teleportSize } = ((buffer, offset) => {
        switch (mode) {
          case "teleport": return ((buffer, offset) => {
            let { value: cause, size: causeSize } = ((buffer, offset) => {
              const { value, size } = (ctx.li32)(buffer, offset)
              return { value: {"0":"unknown","1":"projectile","2":"chorus_fruit","3":"command","4":"behavior"}[value] || value, size }
            })(buffer, offset)
            let { value: source_entity_type, size: source_entity_typeSize } = (ctx.LegacyEntityType)(buffer, offset + causeSize)
            return { value: { cause, source_entity_type }, size: causeSize + source_entity_typeSize}
          })(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + runtime_idSize + positionSize + pitchSize + yawSize + head_yawSize + modeSize + on_groundSize + ridden_runtime_idSize)
      let { value: tick, size: tickSize } = (ctx.varint64)(buffer, offset + runtime_idSize + positionSize + pitchSize + yawSize + head_yawSize + modeSize + on_groundSize + ridden_runtime_idSize + teleportSize)
      return { value: { runtime_id, position, pitch, yaw, head_yaw, mode, on_ground, ridden_runtime_id, teleport, tick }, size: runtime_idSize + positionSize + pitchSize + yawSize + head_yawSize + modeSize + on_groundSize + ridden_runtime_idSize + teleportSize + tickSize}
    },
    packet_rider_jump: (buffer, offset) => {
      let { value: jump_strength, size: jump_strengthSize } = (ctx.zigzag32)(buffer, offset)
      return { value: { jump_strength }, size: jump_strengthSize}
    },
    packet_update_block: (buffer, offset) => {
      let { value: coordinates, size: coordinatesSize } = (ctx.BlockCoordinates)(buffer, offset)
      let { value: block_runtime_id, size: block_runtime_idSize } = (ctx.varint)(buffer, offset + coordinatesSize)
      let { value: block_priority, size: block_prioritySize } = (ctx.varint)(buffer, offset + coordinatesSize + block_runtime_idSize)
      let { value: storage, size: storageSize } = (ctx.varint)(buffer, offset + coordinatesSize + block_runtime_idSize + block_prioritySize)
      return { value: { coordinates, block_runtime_id, block_priority, storage }, size: coordinatesSize + block_runtime_idSize + block_prioritySize + storageSize}
    },
    packet_add_painting: (buffer, offset) => {
      let { value: entity_id_self, size: entity_id_selfSize } = (ctx.zigzag64)(buffer, offset)
      let { value: runtime_entity_id, size: runtime_entity_idSize } = (ctx.varint)(buffer, offset + entity_id_selfSize)
      let { value: coordinates, size: coordinatesSize } = (ctx.BlockCoordinates)(buffer, offset + entity_id_selfSize + runtime_entity_idSize)
      let { value: direction, size: directionSize } = (ctx.zigzag32)(buffer, offset + entity_id_selfSize + runtime_entity_idSize + coordinatesSize)
      let { value: title, size: titleSize } = (ctx.string)(buffer, offset + entity_id_selfSize + runtime_entity_idSize + coordinatesSize + directionSize)
      return { value: { entity_id_self, runtime_entity_id, coordinates, direction, title }, size: entity_id_selfSize + runtime_entity_idSize + coordinatesSize + directionSize + titleSize}
    },
    packet_tick_sync: (buffer, offset) => {
      let { value: request_time, size: request_timeSize } = (ctx.li64)(buffer, offset)
      let { value: response_time, size: response_timeSize } = (ctx.li64)(buffer, offset + request_timeSize)
      return { value: { request_time, response_time }, size: request_timeSize + response_timeSize}
    },
    packet_level_sound_event_old: (buffer, offset) => {
      let { value: sound_id, size: sound_idSize } = (ctx.u8)(buffer, offset)
      let { value: position, size: positionSize } = (ctx.vec3f)(buffer, offset + sound_idSize)
      let { value: block_id, size: block_idSize } = (ctx.zigzag32)(buffer, offset + sound_idSize + positionSize)
      let { value: entity_type, size: entity_typeSize } = (ctx.zigzag32)(buffer, offset + sound_idSize + positionSize + block_idSize)
      let { value: is_baby_mob, size: is_baby_mobSize } = (ctx.bool)(buffer, offset + sound_idSize + positionSize + block_idSize + entity_typeSize)
      let { value: is_global, size: is_globalSize } = (ctx.bool)(buffer, offset + sound_idSize + positionSize + block_idSize + entity_typeSize + is_baby_mobSize)
      return { value: { sound_id, position, block_id, entity_type, is_baby_mob, is_global }, size: sound_idSize + positionSize + block_idSize + entity_typeSize + is_baby_mobSize + is_globalSize}
    },
    packet_level_event: (buffer, offset) => {
      let { value: event, size: eventSize } = ((buffer, offset) => {
        const { value, size } = (ctx.zigzag32)(buffer, offset)
        return { value: {"1000":"sound_click","1001":"sound_click_fail","1002":"sound_shoot","1003":"sound_door","1004":"sound_fizz","1005":"sound_ignite","1007":"sound_ghast","1008":"sound_ghast_shoot","1009":"sound_blaze_shoot","1010":"sound_door_bump","1012":"sound_door_crash","1018":"sound_enderman_teleport","1020":"sound_anvil_break","1021":"sound_anvil_use","1022":"sound_anvil_fall","1030":"sound_pop","1032":"sound_portal","1040":"sound_itemframe_add_item","1041":"sound_itemframe_remove","1042":"sound_itemframe_place","1043":"sound_itemframe_remove_item","1044":"sound_itemframe_rotate_item","1050":"sound_camera","1051":"sound_orb","1052":"sound_totem","1060":"sound_armor_stand_break","1061":"sound_armor_stand_hit","1062":"sound_armor_stand_fall","1063":"sound_armor_stand_place","2000":"particle_shoot","2001":"particle_destroy","2002":"particle_splash","2003":"particle_eye_despawn","2004":"particle_spawn","2006":"guardian_curse","2008":"particle_block_force_field","2009":"particle_projectile_hit","2013":"particle_enderman_teleport","2014":"particle_punch_block","3001":"start_rain","3002":"start_thunder","3003":"stop_rain","3004":"stop_thunder","3005":"pause_game","3006":"pause_game_no_screen","3007":"set_game_speed","3500":"redstone_trigger","3501":"cauldron_explode","3502":"cauldron_dye_armor","3503":"cauldron_clean_armor","3504":"cauldron_fill_potion","3505":"cauldron_take_potion","3506":"cauldron_fill_water","3507":"cauldron_take_water","3508":"cauldron_add_dye","3509":"cauldron_clean_banner","3600":"block_start_break","3601":"block_stop_break","4000":"set_data","9800":"players_sleeping","16384":"add_particle_mask"}[value] || value, size }
      })(buffer, offset)
      let { value: position, size: positionSize } = (ctx.vec3f)(buffer, offset + eventSize)
      let { value: data, size: dataSize } = (ctx.zigzag32)(buffer, offset + eventSize + positionSize)
      return { value: { event, position, data }, size: eventSize + positionSize + dataSize}
    },
    packet_block_event: (buffer, offset) => {
      let { value: position, size: positionSize } = (ctx.BlockCoordinates)(buffer, offset)
      let { value: type, size: typeSize } = ((buffer, offset) => {
        const { value, size } = (ctx.zigzag32)(buffer, offset)
        return { value: {"0":"sound","1":"change_state"}[value] || value, size }
      })(buffer, offset + positionSize)
      let { value: data, size: dataSize } = (ctx.zigzag32)(buffer, offset + positionSize + typeSize)
      return { value: { position, type, data }, size: positionSize + typeSize + dataSize}
    },
    packet_entity_event: (buffer, offset) => {
      let { value: runtime_entity_id, size: runtime_entity_idSize } = (ctx.varint)(buffer, offset)
      let { value: event_id, size: event_idSize } = ((buffer, offset) => {
        const { value, size } = (ctx.u8)(buffer, offset)
        return { value: {"1":"jump","2":"hurt_animation","3":"death_animation","4":"arm_swing","5":"stop_attack","6":"tame_fail","7":"tame_success","8":"shake_wet","9":"use_item","10":"eat_grass_animation","11":"fish_hook_bubble","12":"fish_hook_position","13":"fish_hook_hook","14":"fish_hook_tease","15":"squid_ink_cloud","16":"zombie_villager_cure","18":"respawn","19":"iron_golem_offer_flower","20":"iron_golem_withdraw_flower","21":"love_particles","22":"villager_angry","23":"villager_happy","24":"witch_spell_particles","25":"firework_particles","26":"in_love_particles","27":"silverfish_spawn_animation","28":"guardian_attack","29":"witch_drink_potion","30":"witch_throw_potion","31":"minecart_tnt_prime_fuse","32":"creeper_prime_fuse","33":"air_supply_expired","34":"player_add_xp_levels","35":"elder_guardian_curse","36":"agent_arm_swing","37":"ender_dragon_death","38":"dust_particles","39":"arrow_shake","57":"eating_item","60":"baby_animal_feed","61":"death_smoke_cloud","62":"complete_trade","63":"remove_leash","65":"consume_totem","66":"player_check_treasure_hunter_achievement","67":"entity_spawn","68":"dragon_puke","69":"item_entity_merge","70":"start_swim","71":"balloon_pop","72":"treasure_hunt","73":"agent_summon","74":"charged_crossbow","75":"fall"}[value] || value, size }
      })(buffer, offset + runtime_entity_idSize)
      let { value: data, size: dataSize } = (ctx.zigzag32)(buffer, offset + runtime_entity_idSize + event_idSize)
      return { value: { runtime_entity_id, event_id, data }, size: runtime_entity_idSize + event_idSize + dataSize}
    },
    packet_mob_effect: (buffer, offset) => {
      let { value: runtime_entity_id, size: runtime_entity_idSize } = (ctx.varint)(buffer, offset)
      let { value: event_id, size: event_idSize } = (ctx.u8)(buffer, offset + runtime_entity_idSize)
      let { value: effect_id, size: effect_idSize } = (ctx.zigzag32)(buffer, offset + runtime_entity_idSize + event_idSize)
      let { value: amplifier, size: amplifierSize } = (ctx.zigzag32)(buffer, offset + runtime_entity_idSize + event_idSize + effect_idSize)
      let { value: particles, size: particlesSize } = (ctx.bool)(buffer, offset + runtime_entity_idSize + event_idSize + effect_idSize + amplifierSize)
      let { value: duration, size: durationSize } = (ctx.zigzag32)(buffer, offset + runtime_entity_idSize + event_idSize + effect_idSize + amplifierSize + particlesSize)
      return { value: { runtime_entity_id, event_id, effect_id, amplifier, particles, duration }, size: runtime_entity_idSize + event_idSize + effect_idSize + amplifierSize + particlesSize + durationSize}
    },
    packet_update_attributes: (buffer, offset) => {
      let { value: runtime_entity_id, size: runtime_entity_idSize } = (ctx.varint64)(buffer, offset)
      let { value: attributes, size: attributesSize } = (ctx.PlayerAttributes)(buffer, offset + runtime_entity_idSize)
      let { value: tick, size: tickSize } = (ctx.varint64)(buffer, offset + runtime_entity_idSize + attributesSize)
      return { value: { runtime_entity_id, attributes, tick }, size: runtime_entity_idSize + attributesSize + tickSize}
    },
    packet_inventory_transaction: (buffer, offset) => {
      let { value: transaction, size: transactionSize } = (ctx.Transaction)(buffer, offset)
      return { value: { transaction }, size: transactionSize}
    },
    packet_mob_equipment: (buffer, offset) => {
      let { value: runtime_entity_id, size: runtime_entity_idSize } = (ctx.varint)(buffer, offset)
      let { value: item, size: itemSize } = (ctx.Item)(buffer, offset + runtime_entity_idSize)
      let { value: slot, size: slotSize } = (ctx.u8)(buffer, offset + runtime_entity_idSize + itemSize)
      let { value: selected_slot, size: selected_slotSize } = (ctx.u8)(buffer, offset + runtime_entity_idSize + itemSize + slotSize)
      let { value: windows_id, size: windows_idSize } = (ctx.WindowID)(buffer, offset + runtime_entity_idSize + itemSize + slotSize + selected_slotSize)
      return { value: { runtime_entity_id, item, slot, selected_slot, windows_id }, size: runtime_entity_idSize + itemSize + slotSize + selected_slotSize + windows_idSize}
    },
    packet_mob_armor_equipment: (buffer, offset) => {
      let { value: runtime_entity_id, size: runtime_entity_idSize } = (ctx.varint)(buffer, offset)
      let { value: helmet, size: helmetSize } = (ctx.Item)(buffer, offset + runtime_entity_idSize)
      let { value: chestplate, size: chestplateSize } = (ctx.Item)(buffer, offset + runtime_entity_idSize + helmetSize)
      let { value: leggings, size: leggingsSize } = (ctx.Item)(buffer, offset + runtime_entity_idSize + helmetSize + chestplateSize)
      let { value: boots, size: bootsSize } = (ctx.Item)(buffer, offset + runtime_entity_idSize + helmetSize + chestplateSize + leggingsSize)
      return { value: { runtime_entity_id, helmet, chestplate, leggings, boots }, size: runtime_entity_idSize + helmetSize + chestplateSize + leggingsSize + bootsSize}
    },
    packet_interact: (buffer, offset) => {
      let { value: action_id, size: action_idSize } = ((buffer, offset) => {
        const { value, size } = (ctx.u8)(buffer, offset)
        return { value: {"3":"leave_vehicle","4":"mouse_over_entity","6":"open_inventory"}[value] || value, size }
      })(buffer, offset)
      let { value: target_runtime_entity_id, size: target_runtime_entity_idSize } = (ctx.varint)(buffer, offset + action_idSize)
      let { value: position, size: positionSize } = ((buffer, offset) => {
        switch (action_id) {
          case "mouse_over_entity": return (ctx.vec3f)(buffer, offset)
          case "leave_vehicle": return (ctx.vec3f)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + action_idSize + target_runtime_entity_idSize)
      return { value: { action_id, target_runtime_entity_id, position }, size: action_idSize + target_runtime_entity_idSize + positionSize}
    },
    packet_block_pick_request: (buffer, offset) => {
      let { value: x, size: xSize } = (ctx.zigzag32)(buffer, offset)
      let { value: y, size: ySize } = (ctx.zigzag32)(buffer, offset + xSize)
      let { value: z, size: zSize } = (ctx.zigzag32)(buffer, offset + xSize + ySize)
      let { value: add_user_data, size: add_user_dataSize } = (ctx.bool)(buffer, offset + xSize + ySize + zSize)
      let { value: selected_slot, size: selected_slotSize } = (ctx.u8)(buffer, offset + xSize + ySize + zSize + add_user_dataSize)
      return { value: { x, y, z, add_user_data, selected_slot }, size: xSize + ySize + zSize + add_user_dataSize + selected_slotSize}
    },
    packet_entity_pick_request: (buffer, offset) => {
      let { value: runtime_entity_id, size: runtime_entity_idSize } = (ctx.lu64)(buffer, offset)
      let { value: selected_slot, size: selected_slotSize } = (ctx.u8)(buffer, offset + runtime_entity_idSize)
      return { value: { runtime_entity_id, selected_slot }, size: runtime_entity_idSize + selected_slotSize}
    },
    packet_player_action: (buffer, offset) => {
      let { value: runtime_entity_id, size: runtime_entity_idSize } = (ctx.varint)(buffer, offset)
      let { value: action, size: actionSize } = ((buffer, offset) => {
        const { value, size } = (ctx.zigzag32)(buffer, offset)
        return { value: {"0":"start_break","1":"abort_break","2":"stop_break","3":"get_updated_block","4":"drop_item","5":"start_sleeping","6":"stop_sleeping","7":"respawn","8":"jump","9":"start_sprint","10":"stop_sprint","11":"start_sneak","12":"stop_sneak","13":"creative_player_destroy_block","14":"dimension_change_ack","15":"start_glide","16":"stop_glide","17":"build_denied","18":"continue_break","19":"change_skin","20":"set_enchatnment_seed","21":"swimming","22":"stop_swimming","23":"start_spin_attack","24":"stop_spin_attack","25":"ineract_block"}[value] || value, size }
      })(buffer, offset + runtime_entity_idSize)
      let { value: position, size: positionSize } = (ctx.BlockCoordinates)(buffer, offset + runtime_entity_idSize + actionSize)
      let { value: face, size: faceSize } = (ctx.zigzag32)(buffer, offset + runtime_entity_idSize + actionSize + positionSize)
      return { value: { runtime_entity_id, action, position, face }, size: runtime_entity_idSize + actionSize + positionSize + faceSize}
    },
    packet_hurt_armor: (buffer, offset) => {
      let { value: health, size: healthSize } = (ctx.zigzag32)(buffer, offset)
      return { value: { health }, size: healthSize}
    },
    packet_set_entity_data: (buffer, offset) => {
      let { value: runtime_entity_id, size: runtime_entity_idSize } = (ctx.varint)(buffer, offset)
      let { value: metadata, size: metadataSize } = (ctx.MetadataDictionary)(buffer, offset + runtime_entity_idSize)
      let { value: tick, size: tickSize } = (ctx.varint)(buffer, offset + runtime_entity_idSize + metadataSize)
      return { value: { runtime_entity_id, metadata, tick }, size: runtime_entity_idSize + metadataSize + tickSize}
    },
    packet_set_entity_motion: (buffer, offset) => {
      let { value: runtime_entity_id, size: runtime_entity_idSize } = (ctx.varint)(buffer, offset)
      let { value: velocity, size: velocitySize } = (ctx.vec3f)(buffer, offset + runtime_entity_idSize)
      return { value: { runtime_entity_id, velocity }, size: runtime_entity_idSize + velocitySize}
    },
    packet_set_entity_link: (buffer, offset) => {
      let { value: link, size: linkSize } = (ctx.Link)(buffer, offset)
      return { value: { link }, size: linkSize}
    },
    packet_set_health: (buffer, offset) => {
      let { value: health, size: healthSize } = (ctx.zigzag32)(buffer, offset)
      return { value: { health }, size: healthSize}
    },
    packet_set_spawn_position: (buffer, offset) => {
      let { value: spawn_type, size: spawn_typeSize } = ((buffer, offset) => {
        const { value, size } = (ctx.zigzag32)(buffer, offset)
        return { value: {"0":"player","1":"world"}[value] || value, size }
      })(buffer, offset)
      let { value: player_position, size: player_positionSize } = (ctx.BlockCoordinates)(buffer, offset + spawn_typeSize)
      let { value: dimension, size: dimensionSize } = (ctx.zigzag32)(buffer, offset + spawn_typeSize + player_positionSize)
      let { value: world_position, size: world_positionSize } = (ctx.BlockCoordinates)(buffer, offset + spawn_typeSize + player_positionSize + dimensionSize)
      return { value: { spawn_type, player_position, dimension, world_position }, size: spawn_typeSize + player_positionSize + dimensionSize + world_positionSize}
    },
    packet_animate: (buffer, offset) => {
      let { value: action_id, size: action_idSize } = (ctx.zigzag32)(buffer, offset)
      let { value: runtime_entity_id, size: runtime_entity_idSize } = (ctx.varint)(buffer, offset + action_idSize)
      return { value: { action_id, runtime_entity_id }, size: action_idSize + runtime_entity_idSize}
    },
    packet_respawn: (buffer, offset) => {
      let { value: x, size: xSize } = (ctx.lf32)(buffer, offset)
      let { value: y, size: ySize } = (ctx.lf32)(buffer, offset + xSize)
      let { value: z, size: zSize } = (ctx.lf32)(buffer, offset + xSize + ySize)
      let { value: state, size: stateSize } = (ctx.u8)(buffer, offset + xSize + ySize + zSize)
      let { value: runtime_entity_id, size: runtime_entity_idSize } = (ctx.varint)(buffer, offset + xSize + ySize + zSize + stateSize)
      return { value: { x, y, z, state, runtime_entity_id }, size: xSize + ySize + zSize + stateSize + runtime_entity_idSize}
    },
    packet_container_open: (buffer, offset) => {
      let { value: window_id, size: window_idSize } = (ctx.WindowID)(buffer, offset)
      let { value: window_type, size: window_typeSize } = (ctx.WindowType)(buffer, offset + window_idSize)
      let { value: coordinates, size: coordinatesSize } = (ctx.BlockCoordinates)(buffer, offset + window_idSize + window_typeSize)
      let { value: runtime_entity_id, size: runtime_entity_idSize } = (ctx.zigzag64)(buffer, offset + window_idSize + window_typeSize + coordinatesSize)
      return { value: { window_id, window_type, coordinates, runtime_entity_id }, size: window_idSize + window_typeSize + coordinatesSize + runtime_entity_idSize}
    },
    packet_container_close: (buffer, offset) => {
      let { value: window_id, size: window_idSize } = (ctx.WindowID)(buffer, offset)
      let { value: server, size: serverSize } = (ctx.bool)(buffer, offset + window_idSize)
      return { value: { window_id, server }, size: window_idSize + serverSize}
    },
    packet_player_hotbar: (buffer, offset) => {
      let { value: selected_slot, size: selected_slotSize } = (ctx.varint)(buffer, offset)
      let { value: window_id, size: window_idSize } = (ctx.WindowID)(buffer, offset + selected_slotSize)
      let { value: select_slot, size: select_slotSize } = (ctx.bool)(buffer, offset + selected_slotSize + window_idSize)
      return { value: { selected_slot, window_id, select_slot }, size: selected_slotSize + window_idSize + select_slotSize}
    },
    packet_inventory_content: (buffer, offset) => {
      let { value: inventory_id, size: inventory_idSize } = (ctx.varint)(buffer, offset)
      let { value: input, size: inputSize } = (ctx.ItemStacks)(buffer, offset + inventory_idSize)
      return { value: { inventory_id, input }, size: inventory_idSize + inputSize}
    },
    packet_inventory_slot: (buffer, offset) => {
      let { value: window_id, size: window_idSize } = (ctx.WindowID)(buffer, offset)
      let { value: slot, size: slotSize } = (ctx.varint)(buffer, offset + window_idSize)
      let { value: item, size: itemSize } = (ctx.ItemStack)(buffer, offset + window_idSize + slotSize)
      return { value: { window_id, slot, item }, size: window_idSize + slotSize + itemSize}
    },
    packet_container_set_data: (buffer, offset) => {
      let { value: window_id, size: window_idSize } = (ctx.WindowID)(buffer, offset)
      let { value: property, size: propertySize } = (ctx.zigzag32)(buffer, offset + window_idSize)
      let { value: value1, size: value1Size } = (ctx.zigzag32)(buffer, offset + window_idSize + propertySize)
      return { value: { window_id, property, value: value1 }, size: window_idSize + propertySize + value1Size}
    },
    packet_crafting_data: (buffer, offset) => {
      let { value: recipes, size: recipesSize } = (ctx.Recipes)(buffer, offset)
      let { value: potion_type_recipes, size: potion_type_recipesSize } = (ctx.PotionTypeRecipes)(buffer, offset + recipesSize)
      let { value: potion_container_recipes, size: potion_container_recipesSize } = (ctx.PotionContainerChangeRecipes)(buffer, offset + recipesSize + potion_type_recipesSize)
      let { value: is_clean, size: is_cleanSize } = (ctx.bool)(buffer, offset + recipesSize + potion_type_recipesSize + potion_container_recipesSize)
      return { value: { recipes, potion_type_recipes, potion_container_recipes, is_clean }, size: recipesSize + potion_type_recipesSize + potion_container_recipesSize + is_cleanSize}
    },
    packet_crafting_event: (buffer, offset) => {
      let { value: window_id, size: window_idSize } = (ctx.WindowID)(buffer, offset)
      let { value: recipe_type, size: recipe_typeSize } = ((buffer, offset) => {
        const { value, size } = (ctx.zigzag32)(buffer, offset)
        return { value: {"0":"inventory","1":"crafting","2":"workbench"}[value] || value, size }
      })(buffer, offset + window_idSize)
      let { value: recipe_id, size: recipe_idSize } = (ctx.uuid)(buffer, offset + window_idSize + recipe_typeSize)
      let { value: input, size: inputSize } = ((buffer, offset) => {
        const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = (ctx.Item)(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset + window_idSize + recipe_typeSize + recipe_idSize)
      let { value: result, size: resultSize } = ((buffer, offset) => {
        const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = (ctx.Item)(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset + window_idSize + recipe_typeSize + recipe_idSize + inputSize)
      return { value: { window_id, recipe_type, recipe_id, input, result }, size: window_idSize + recipe_typeSize + recipe_idSize + inputSize + resultSize}
    },
    packet_gui_data_pick_item: (buffer, offset) => {
      return { value: {  }, size: 0}
    },
    packet_adventure_settings: (buffer, offset) => {
      let { value: flags, size: flagsSize } = (ctx.AdventureFlags)(buffer, offset)
      let { value: command_permission, size: command_permissionSize } = ((buffer, offset) => {
        const { value, size } = (ctx.varint32)(buffer, offset)
        return { value: {"0":"normal","1":"operator","2":"host","3":"automation","4":"admin"}[value] || value, size }
      })(buffer, offset + flagsSize)
      let { value: action_permissions, size: action_permissionsSize } = (ctx.ActionPermissions)(buffer, offset + flagsSize + command_permissionSize)
      let { value: permission_level, size: permission_levelSize } = ((buffer, offset) => {
        const { value, size } = (ctx.varint)(buffer, offset)
        return { value: {"0":"visitor","1":"member","2":"operator","3":"custom"}[value] || value, size }
      })(buffer, offset + flagsSize + command_permissionSize + action_permissionsSize)
      let { value: custom_stored_permissions, size: custom_stored_permissionsSize } = (ctx.varint)(buffer, offset + flagsSize + command_permissionSize + action_permissionsSize + permission_levelSize)
      let { value: user_id, size: user_idSize } = (ctx.li64)(buffer, offset + flagsSize + command_permissionSize + action_permissionsSize + permission_levelSize + custom_stored_permissionsSize)
      return { value: { flags, command_permission, action_permissions, permission_level, custom_stored_permissions, user_id }, size: flagsSize + command_permissionSize + action_permissionsSize + permission_levelSize + custom_stored_permissionsSize + user_idSize}
    },
    packet_block_entity_data: (buffer, offset) => {
      let { value: position, size: positionSize } = (ctx.BlockCoordinates)(buffer, offset)
      let { value: nbt, size: nbtSize } = (ctx.nbt)(buffer, offset + positionSize)
      return { value: { position, nbt }, size: positionSize + nbtSize}
    },
    packet_player_input: (buffer, offset) => {
      let { value: motion_x, size: motion_xSize } = (ctx.lf32)(buffer, offset)
      let { value: motion_z, size: motion_zSize } = (ctx.lf32)(buffer, offset + motion_xSize)
      let { value: jumping, size: jumpingSize } = (ctx.bool)(buffer, offset + motion_xSize + motion_zSize)
      let { value: sneaking, size: sneakingSize } = (ctx.bool)(buffer, offset + motion_xSize + motion_zSize + jumpingSize)
      return { value: { motion_x, motion_z, jumping, sneaking }, size: motion_xSize + motion_zSize + jumpingSize + sneakingSize}
    },
    packet_level_chunk: (buffer, offset) => {
      let { value: x, size: xSize } = (ctx.zigzag32)(buffer, offset)
      let { value: z, size: zSize } = (ctx.zigzag32)(buffer, offset + xSize)
      let { value: sub_chunk_count, size: sub_chunk_countSize } = (ctx.varint)(buffer, offset + xSize + zSize)
      let { value: cache_enabled, size: cache_enabledSize } = (ctx.bool)(buffer, offset + xSize + zSize + sub_chunk_countSize)
      let { value: blobs, size: blobsSize } = ((buffer, offset) => {
        switch (cache_enabled) {
          case true: return ((buffer, offset) => {
            let { value: hashes, size: hashesSize } = ((buffer, offset) => {
              const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
              if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
              const data = []
              let size = countSize
              for (let i = 0; i < count; i++) {
                const elem = (ctx.lu64)(buffer, offset + size)
                data.push(elem.value)
                size += elem.size
              }
              return { value: data, size }
            })(buffer, offset)
            return { value: { hashes }, size: hashesSize}
          })(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + xSize + zSize + sub_chunk_countSize + cache_enabledSize)
      let { value: payload, size: payloadSize } = (ctx.ByteArray)(buffer, offset + xSize + zSize + sub_chunk_countSize + cache_enabledSize + blobsSize)
      return { value: { x, z, sub_chunk_count, cache_enabled, blobs, payload }, size: xSize + zSize + sub_chunk_countSize + cache_enabledSize + blobsSize + payloadSize}
    },
    packet_set_commands_enabled: (buffer, offset) => {
      let { value: enabled, size: enabledSize } = (ctx.bool)(buffer, offset)
      return { value: { enabled }, size: enabledSize}
    },
    packet_set_difficulty: (buffer, offset) => {
      let { value: difficulty, size: difficultySize } = (ctx.varint)(buffer, offset)
      return { value: { difficulty }, size: difficultySize}
    },
    packet_change_dimension: (buffer, offset) => {
      let { value: dimension, size: dimensionSize } = (ctx.zigzag32)(buffer, offset)
      let { value: position, size: positionSize } = (ctx.vec3f)(buffer, offset + dimensionSize)
      let { value: respawn, size: respawnSize } = (ctx.bool)(buffer, offset + dimensionSize + positionSize)
      return { value: { dimension, position, respawn }, size: dimensionSize + positionSize + respawnSize}
    },
    packet_set_player_game_type: (buffer, offset) => {
      let { value: gamemode, size: gamemodeSize } = (ctx.GameMode)(buffer, offset)
      return { value: { gamemode }, size: gamemodeSize}
    },
    packet_player_list: (buffer, offset) => {
      let { value: records, size: recordsSize } = (ctx.PlayerRecords)(buffer, offset)
      return { value: { records }, size: recordsSize}
    },
    packet_simple_event: (buffer, offset) => {
      let { value: event_type, size: event_typeSize } = (ctx.lu16)(buffer, offset)
      return { value: { event_type }, size: event_typeSize}
    },
    packet_event: (buffer, offset) => {
      let { value: runtime_id, size: runtime_idSize } = (ctx.varint64)(buffer, offset)
      let { value: event_type, size: event_typeSize } = ((buffer, offset) => {
        const { value, size } = (ctx.zigzag32)(buffer, offset)
        return { value: {"0":"achievement_awarded","1":"entity_interact","2":"portal_built","3":"portal_used","4":"mob_killed","5":"cauldron_used","6":"player_death","7":"boss_killed","8":"agent_command","9":"agent_created","10":"banner_pattern_removed","11":"commaned_executed","12":"fish_bucketed","13":"mob_born","14":"pet_died","15":"cauldron_block_used","16":"composter_block_used","17":"bell_block_used"}[value] || value, size }
      })(buffer, offset + runtime_idSize)
      let { value: use_player_id, size: use_player_idSize } = (ctx.u8)(buffer, offset + runtime_idSize + event_typeSize)
      let { value: event_data, size: event_dataSize } = (ctx.restBuffer)(buffer, offset + runtime_idSize + event_typeSize + use_player_idSize)
      return { value: { runtime_id, event_type, use_player_id, event_data }, size: runtime_idSize + event_typeSize + use_player_idSize + event_dataSize}
    },
    packet_spawn_experience_orb: (buffer, offset) => {
      let { value: position, size: positionSize } = (ctx.vec3f)(buffer, offset)
      let { value: count, size: countSize } = (ctx.zigzag32)(buffer, offset + positionSize)
      return { value: { position, count }, size: positionSize + countSize}
    },
    packet_clientbound_map_item_data: (buffer, offset) => {
      let { value: mapinfo, size: mapinfoSize } = (ctx.MapInfo)(buffer, offset)
      return { value: { mapinfo }, size: mapinfoSize}
    },
    packet_map_info_request: (buffer, offset) => {
      let { value: map_id, size: map_idSize } = (ctx.zigzag64)(buffer, offset)
      return { value: { map_id }, size: map_idSize}
    },
    packet_request_chunk_radius: (buffer, offset) => {
      let { value: chunk_radius, size: chunk_radiusSize } = (ctx.zigzag32)(buffer, offset)
      return { value: { chunk_radius }, size: chunk_radiusSize}
    },
    packet_chunk_radius_update: (buffer, offset) => {
      let { value: chunk_radius, size: chunk_radiusSize } = (ctx.zigzag32)(buffer, offset)
      return { value: { chunk_radius }, size: chunk_radiusSize}
    },
    packet_item_frame_drop_item: (buffer, offset) => {
      let { value: coordinates, size: coordinatesSize } = (ctx.BlockCoordinates)(buffer, offset)
      return { value: { coordinates }, size: coordinatesSize}
    },
    packet_game_rules_changed: (buffer, offset) => {
      let { value: rules, size: rulesSize } = (ctx.GameRules)(buffer, offset)
      return { value: { rules }, size: rulesSize}
    },
    packet_camera: (buffer, offset) => {
      let { value: camera_entity_unique_id, size: camera_entity_unique_idSize } = (ctx.zigzag64)(buffer, offset)
      let { value: target_player_unique_id, size: target_player_unique_idSize } = (ctx.zigzag64)(buffer, offset + camera_entity_unique_idSize)
      return { value: { camera_entity_unique_id, target_player_unique_id }, size: camera_entity_unique_idSize + target_player_unique_idSize}
    },
    packet_boss_event: (buffer, offset) => {
      let { value: boss_entity_id, size: boss_entity_idSize } = (ctx.zigzag64)(buffer, offset)
      let { value: type, size: typeSize } = ((buffer, offset) => {
        const { value, size } = (ctx.varint)(buffer, offset)
        return { value: {"0":"show_bar","1":"register_player","2":"hide_bar","3":"unregister_player","4":"set_bar_progress","5":"set_bar_title","6":"update_properties","7":"texture"}[value] || value, size }
      })(buffer, offset + boss_entity_idSize)
      let { value: player_id, size: player_idSize } = ((buffer, offset) => {
        switch (type) {
          case "register_player": return (ctx.zigzag64)(buffer, offset)
          case "unregister_player": return (ctx.zigzag64)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + boss_entity_idSize + typeSize)
      let { value: title, size: titleSize } = ((buffer, offset) => {
        switch (type) {
          case "show": return (ctx.string)(buffer, offset)
          case "set_bar_title": return (ctx.string)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + boss_entity_idSize + typeSize + player_idSize)
      let { value: bar_progress, size: bar_progressSize } = ((buffer, offset) => {
        switch (type) {
          case "show": return (ctx.lf32)(buffer, offset)
          case "set_bar_progress": return (ctx.lf32)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + boss_entity_idSize + typeSize + player_idSize + titleSize)
      let { value: darkness_factor, size: darkness_factorSize } = ((buffer, offset) => {
        switch (type) {
          case "update_properties": return (ctx.li16)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + boss_entity_idSize + typeSize + player_idSize + titleSize + bar_progressSize)
      let { value: color, size: colorSize } = ((buffer, offset) => {
        switch (type) {
          case "texture": return (ctx.varint)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + boss_entity_idSize + typeSize + player_idSize + titleSize + bar_progressSize + darkness_factorSize)
      let { value: overlay, size: overlaySize } = ((buffer, offset) => {
        switch (type) {
          case "texture": return (ctx.varint)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + boss_entity_idSize + typeSize + player_idSize + titleSize + bar_progressSize + darkness_factorSize + colorSize)
      return { value: { boss_entity_id, type, player_id, title, bar_progress, darkness_factor, color, overlay }, size: boss_entity_idSize + typeSize + player_idSize + titleSize + bar_progressSize + darkness_factorSize + colorSize + overlaySize}
    },
    packet_show_credits: (buffer, offset) => {
      let { value: runtime_entity_id, size: runtime_entity_idSize } = (ctx.varint)(buffer, offset)
      let { value: status, size: statusSize } = (ctx.zigzag32)(buffer, offset + runtime_entity_idSize)
      return { value: { runtime_entity_id, status }, size: runtime_entity_idSize + statusSize}
    },
    packet_available_commands: (buffer, offset) => {
      let { value: values_len, size: values_lenSize } = (ctx.varint)(buffer, offset)
      let { value: _enum_type, size: _enum_typeSize } = ((buffer, offset) => {
        if (values_len <= 0xff) return { value: 'byte', size: 0 }
            if (values_len <= 0xffff) return { value: 'short', size: 0 }
            if (values_len <= 0xffffff) return { value: 'int', size: 0 }
      })(buffer, offset + values_lenSize)
      let { value: enum_values, size: enum_valuesSize } = ((buffer, offset) => {
        const count = values_len
        const countSize = 0
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = (ctx.string)(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset + values_lenSize + _enum_typeSize)
      let { value: suffixes, size: suffixesSize } = ((buffer, offset) => {
        const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = (ctx.string)(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset + values_lenSize + _enum_typeSize + enum_valuesSize)
      let { value: enums, size: enumsSize } = ((buffer, offset) => {
        const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = ((buffer, offset) => {
          let { value: name1, size: name1Size } = (ctx.string)(buffer, offset)
          let { value: values, size: valuesSize } = ((buffer, offset) => {
            const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
            if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
            const data = []
            let size = countSize
            for (let i = 0; i < count; i++) {
              const elem = ((buffer, offset) => {
              switch (_enum_type) {
                case "byte": return (ctx.u8)(buffer, offset)
                case "short": return (ctx.lu16)(buffer, offset)
                case "int": return (ctx.lu32)(buffer, offset)
                default: return (ctx.void)(buffer, offset)
              }
            })(buffer, offset + size)
              data.push(elem.value)
              size += elem.size
            }
            return { value: data, size }
          })(buffer, offset + name1Size)
          return { value: { name: name1, values }, size: name1Size + valuesSize}
        })(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset + values_lenSize + _enum_typeSize + enum_valuesSize + suffixesSize)
      let { value: command_data, size: command_dataSize } = ((buffer, offset) => {
        const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = ((buffer, offset) => {
          let { value: name1, size: name1Size } = (ctx.string)(buffer, offset)
          let { value: description, size: descriptionSize } = (ctx.string)(buffer, offset + name1Size)
          let { value: flags1, size: flags1Size } = (ctx.u8)(buffer, offset + name1Size + descriptionSize)
          let { value: permission_level1, size: permission_level1Size } = (ctx.u8)(buffer, offset + name1Size + descriptionSize + flags1Size)
          let { value: alias, size: aliasSize } = (ctx.li32)(buffer, offset + name1Size + descriptionSize + flags1Size + permission_level1Size)
          let { value: overloads, size: overloadsSize } = ((buffer, offset) => {
            const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
            if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
            const data = []
            let size = countSize
            for (let i = 0; i < count; i++) {
              const elem = ((buffer, offset) => {
              const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
              if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
              const data = []
              let size = countSize
              for (let i = 0; i < count; i++) {
                const elem = ((buffer, offset) => {
                let { value: paramater_name, size: paramater_nameSize } = (ctx.string)(buffer, offset)
                let { value: value_type, size: value_typeSize } = ((buffer, offset) => {
                  const { value, size } = (ctx.lu16)(buffer, offset)
                  return { value: {"1":"int","2":"float","3":"value","4":"wildcard_int","5":"operator","6":"target","14":"file_path","29":"string","37":"position","41":"message","43":"raw_text","46":"json","53":"command"}[value] || value, size }
                })(buffer, offset + paramater_nameSize)
                let { value: enum_type, size: enum_typeSize } = ((buffer, offset) => {
                  const { value, size } = (ctx.lu16)(buffer, offset)
                  return { value: {"16":"valid","32":"enum","256":"suffixed","1024":"soft_enum"}[value] || value, size }
                })(buffer, offset + paramater_nameSize + value_typeSize)
                let { value: optional, size: optionalSize } = (ctx.bool)(buffer, offset + paramater_nameSize + value_typeSize + enum_typeSize)
                let { value: options, size: optionsSize } = (ctx.CommandFlags)(buffer, offset + paramater_nameSize + value_typeSize + enum_typeSize + optionalSize)
                return { value: { paramater_name, value_type, enum_type, optional, options }, size: paramater_nameSize + value_typeSize + enum_typeSize + optionalSize + optionsSize}
              })(buffer, offset + size)
                data.push(elem.value)
                size += elem.size
              }
              return { value: data, size }
            })(buffer, offset + size)
              data.push(elem.value)
              size += elem.size
            }
            return { value: data, size }
          })(buffer, offset + name1Size + descriptionSize + flags1Size + permission_level1Size + aliasSize)
          return { value: { name: name1, description, flags: flags1, permission_level: permission_level1, alias, overloads }, size: name1Size + descriptionSize + flags1Size + permission_level1Size + aliasSize + overloadsSize}
        })(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset + values_lenSize + _enum_typeSize + enum_valuesSize + suffixesSize + enumsSize)
      let { value: dynamic_enums, size: dynamic_enumsSize } = ((buffer, offset) => {
        const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = ((buffer, offset) => {
          let { value: name1, size: name1Size } = (ctx.string)(buffer, offset)
          let { value: values, size: valuesSize } = ((buffer, offset) => {
            const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
            if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
            const data = []
            let size = countSize
            for (let i = 0; i < count; i++) {
              const elem = (ctx.string)(buffer, offset + size)
              data.push(elem.value)
              size += elem.size
            }
            return { value: data, size }
          })(buffer, offset + name1Size)
          return { value: { name: name1, values }, size: name1Size + valuesSize}
        })(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset + values_lenSize + _enum_typeSize + enum_valuesSize + suffixesSize + enumsSize + command_dataSize)
      let { value: enum_constraints, size: enum_constraintsSize } = ((buffer, offset) => {
        const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = ((buffer, offset) => {
          let { value: value_index, size: value_indexSize } = (ctx.li32)(buffer, offset)
          let { value: enum_index, size: enum_indexSize } = (ctx.li32)(buffer, offset + value_indexSize)
          let { value: constraints, size: constraintsSize } = ((buffer, offset) => {
            const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
            if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
            const data = []
            let size = countSize
            for (let i = 0; i < count; i++) {
              const elem = ((buffer, offset) => {
              let { value: constraint, size: constraintSize } = ((buffer, offset) => {
                const { value, size } = (ctx.u8)(buffer, offset)
                return { value: {"0":"cheats_enabled"}[value] || value, size }
              })(buffer, offset)
              return { value: { constraint }, size: constraintSize}
            })(buffer, offset + size)
              data.push(elem.value)
              size += elem.size
            }
            return { value: data, size }
          })(buffer, offset + value_indexSize + enum_indexSize)
          return { value: { value_index, enum_index, constraints }, size: value_indexSize + enum_indexSize + constraintsSize}
        })(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset + values_lenSize + _enum_typeSize + enum_valuesSize + suffixesSize + enumsSize + command_dataSize + dynamic_enumsSize)
      return { value: { values_len, _enum_type, enum_values, suffixes, enums, command_data, dynamic_enums, enum_constraints }, size: values_lenSize + _enum_typeSize + enum_valuesSize + suffixesSize + enumsSize + command_dataSize + dynamic_enumsSize + enum_constraintsSize}
    },
    packet_command_request: (buffer, offset) => {
      let { value: command, size: commandSize } = (ctx.string)(buffer, offset)
      let { value: origin, size: originSize } = (ctx.CommandOrigin)(buffer, offset + commandSize)
      let { value: interval, size: intervalSize } = (ctx.bool)(buffer, offset + commandSize + originSize)
      return { value: { command, origin, interval }, size: commandSize + originSize + intervalSize}
    },
    packet_command_block_update: (buffer, offset) => {
      let { value: is_block, size: is_blockSize } = (ctx.bool)(buffer, offset)
      return { value: { is_block }, size: is_blockSize}
    },
    packet_command_output: (buffer, offset) => {
      let { value: origin, size: originSize } = (ctx.CommandOrigin)(buffer, offset)
      let { value: output_type, size: output_typeSize } = (ctx.i8)(buffer, offset + originSize)
      let { value: success_count, size: success_countSize } = (ctx.varint)(buffer, offset + originSize + output_typeSize)
      let { value: output, size: outputSize } = ((buffer, offset) => {
        const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = ((buffer, offset) => {
          let { value: success, size: successSize } = (ctx.bool)(buffer, offset)
          let { value: message_id, size: message_idSize } = (ctx.string)(buffer, offset + successSize)
          let { value: paramaters1, size: paramaters1Size } = ((buffer, offset) => {
            const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
            if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
            const data = []
            let size = countSize
            for (let i = 0; i < count; i++) {
              const elem = (ctx.string)(buffer, offset + size)
              data.push(elem.value)
              size += elem.size
            }
            return { value: data, size }
          })(buffer, offset + successSize + message_idSize)
          return { value: { success, message_id, paramaters: paramaters1 }, size: successSize + message_idSize + paramaters1Size}
        })(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset + originSize + output_typeSize + success_countSize)
      return { value: { origin, output_type, success_count, output }, size: originSize + output_typeSize + success_countSize + outputSize}
    },
    packet_update_trade: (buffer, offset) => {
      let { value: window_id, size: window_idSize } = (ctx.WindowID)(buffer, offset)
      let { value: window_type, size: window_typeSize } = (ctx.WindowType)(buffer, offset + window_idSize)
      let { value: size1, size: size1Size } = (ctx.varint)(buffer, offset + window_idSize + window_typeSize)
      let { value: trade_tier, size: trade_tierSize } = (ctx.varint)(buffer, offset + window_idSize + window_typeSize + size1Size)
      let { value: villager_unique_id, size: villager_unique_idSize } = (ctx.varint64)(buffer, offset + window_idSize + window_typeSize + size1Size + trade_tierSize)
      let { value: entity_unique_id, size: entity_unique_idSize } = (ctx.varint64)(buffer, offset + window_idSize + window_typeSize + size1Size + trade_tierSize + villager_unique_idSize)
      let { value: display_name, size: display_nameSize } = (ctx.string)(buffer, offset + window_idSize + window_typeSize + size1Size + trade_tierSize + villager_unique_idSize + entity_unique_idSize)
      let { value: new_trading_ui, size: new_trading_uiSize } = (ctx.bool)(buffer, offset + window_idSize + window_typeSize + size1Size + trade_tierSize + villager_unique_idSize + entity_unique_idSize + display_nameSize)
      let { value: economic_trades, size: economic_tradesSize } = (ctx.bool)(buffer, offset + window_idSize + window_typeSize + size1Size + trade_tierSize + villager_unique_idSize + entity_unique_idSize + display_nameSize + new_trading_uiSize)
      let { value: offers, size: offersSize } = (ctx.nbt)(buffer, offset + window_idSize + window_typeSize + size1Size + trade_tierSize + villager_unique_idSize + entity_unique_idSize + display_nameSize + new_trading_uiSize + economic_tradesSize)
      return { value: { window_id, window_type, size: size1, trade_tier, villager_unique_id, entity_unique_id, display_name, new_trading_ui, economic_trades, offers }, size: window_idSize + window_typeSize + size1Size + trade_tierSize + villager_unique_idSize + entity_unique_idSize + display_nameSize + new_trading_uiSize + economic_tradesSize + offersSize}
    },
    packet_update_equipment: (buffer, offset) => {
      let { value: window_id, size: window_idSize } = (ctx.WindowID)(buffer, offset)
      let { value: window_type, size: window_typeSize } = (ctx.WindowType)(buffer, offset + window_idSize)
      let { value: size1, size: size1Size } = (ctx.u8)(buffer, offset + window_idSize + window_typeSize)
      let { value: entity_id, size: entity_idSize } = (ctx.zigzag64)(buffer, offset + window_idSize + window_typeSize + size1Size)
      let { value: inventory, size: inventorySize } = (ctx.nbt)(buffer, offset + window_idSize + window_typeSize + size1Size + entity_idSize)
      return { value: { window_id, window_type, size: size1, entity_id, inventory }, size: window_idSize + window_typeSize + size1Size + entity_idSize + inventorySize}
    },
    packet_resource_pack_data_info: (buffer, offset) => {
      let { value: package_id, size: package_idSize } = (ctx.string)(buffer, offset)
      let { value: max_chunk_size, size: max_chunk_sizeSize } = (ctx.lu32)(buffer, offset + package_idSize)
      let { value: chunk_count, size: chunk_countSize } = (ctx.lu32)(buffer, offset + package_idSize + max_chunk_sizeSize)
      let { value: compressed_package_size, size: compressed_package_sizeSize } = (ctx.lu64)(buffer, offset + package_idSize + max_chunk_sizeSize + chunk_countSize)
      let { value: hash, size: hashSize } = (ctx.ByteArray)(buffer, offset + package_idSize + max_chunk_sizeSize + chunk_countSize + compressed_package_sizeSize)
      let { value: is_premium, size: is_premiumSize } = (ctx.bool)(buffer, offset + package_idSize + max_chunk_sizeSize + chunk_countSize + compressed_package_sizeSize + hashSize)
      let { value: pack_type, size: pack_typeSize } = (ctx.u8)(buffer, offset + package_idSize + max_chunk_sizeSize + chunk_countSize + compressed_package_sizeSize + hashSize + is_premiumSize)
      return { value: { package_id, max_chunk_size, chunk_count, compressed_package_size, hash, is_premium, pack_type }, size: package_idSize + max_chunk_sizeSize + chunk_countSize + compressed_package_sizeSize + hashSize + is_premiumSize + pack_typeSize}
    },
    packet_resource_pack_chunk_data: (buffer, offset) => {
      let { value: package_id, size: package_idSize } = (ctx.string)(buffer, offset)
      let { value: chunk_index, size: chunk_indexSize } = (ctx.lu32)(buffer, offset + package_idSize)
      let { value: progress, size: progressSize } = (ctx.lu64)(buffer, offset + package_idSize + chunk_indexSize)
      let { value: payload, size: payloadSize } = (ctx.ByteArray)(buffer, offset + package_idSize + chunk_indexSize + progressSize)
      return { value: { package_id, chunk_index, progress, payload }, size: package_idSize + chunk_indexSize + progressSize + payloadSize}
    },
    packet_resource_pack_chunk_request: (buffer, offset) => {
      let { value: package_id, size: package_idSize } = (ctx.string)(buffer, offset)
      let { value: chunk_index, size: chunk_indexSize } = (ctx.lu32)(buffer, offset + package_idSize)
      return { value: { package_id, chunk_index }, size: package_idSize + chunk_indexSize}
    },
    packet_transfer: (buffer, offset) => {
      let { value: server_address, size: server_addressSize } = (ctx.string)(buffer, offset)
      let { value: port, size: portSize } = (ctx.lu16)(buffer, offset + server_addressSize)
      return { value: { server_address, port }, size: server_addressSize + portSize}
    },
    packet_play_sound: (buffer, offset) => {
      let { value: name, size: nameSize } = (ctx.string)(buffer, offset)
      let { value: coordinates, size: coordinatesSize } = (ctx.BlockCoordinates)(buffer, offset + nameSize)
      let { value: volume, size: volumeSize } = (ctx.lf32)(buffer, offset + nameSize + coordinatesSize)
      let { value: pitch, size: pitchSize } = (ctx.lf32)(buffer, offset + nameSize + coordinatesSize + volumeSize)
      return { value: { name, coordinates, volume, pitch }, size: nameSize + coordinatesSize + volumeSize + pitchSize}
    },
    packet_stop_sound: (buffer, offset) => {
      let { value: name, size: nameSize } = (ctx.string)(buffer, offset)
      let { value: stop_all, size: stop_allSize } = (ctx.bool)(buffer, offset + nameSize)
      return { value: { name, stop_all }, size: nameSize + stop_allSize}
    },
    packet_set_title: (buffer, offset) => {
      let { value: type, size: typeSize } = (ctx.zigzag32)(buffer, offset)
      let { value: text, size: textSize } = (ctx.string)(buffer, offset + typeSize)
      let { value: fade_in_time, size: fade_in_timeSize } = (ctx.zigzag32)(buffer, offset + typeSize + textSize)
      let { value: stay_time, size: stay_timeSize } = (ctx.zigzag32)(buffer, offset + typeSize + textSize + fade_in_timeSize)
      let { value: fade_out_time, size: fade_out_timeSize } = (ctx.zigzag32)(buffer, offset + typeSize + textSize + fade_in_timeSize + stay_timeSize)
      return { value: { type, text, fade_in_time, stay_time, fade_out_time }, size: typeSize + textSize + fade_in_timeSize + stay_timeSize + fade_out_timeSize}
    },
    packet_add_behavior_tree: (buffer, offset) => {
      let { value: behaviortree, size: behaviortreeSize } = (ctx.string)(buffer, offset)
      return { value: { behaviortree }, size: behaviortreeSize}
    },
    packet_structure_block_update: (buffer, offset) => {
      return { value: {  }, size: 0}
    },
    packet_show_store_offer: (buffer, offset) => {
      let { value: unknown0, size: unknown0Size } = (ctx.string)(buffer, offset)
      let { value: unknown1, size: unknown1Size } = (ctx.bool)(buffer, offset + unknown0Size)
      return { value: { unknown0, unknown1 }, size: unknown0Size + unknown1Size}
    },
    packet_purchase_receipt: (buffer, offset) => {
      return { value: {  }, size: 0}
    },
    packet_player_skin: (buffer, offset) => {
      let { value: uuid, size: uuidSize } = (ctx.uuid)(buffer, offset)
      let { value: skin, size: skinSize } = (ctx.Skin)(buffer, offset + uuidSize)
      let { value: skin_name, size: skin_nameSize } = (ctx.string)(buffer, offset + uuidSize + skinSize)
      let { value: old_skin_name, size: old_skin_nameSize } = (ctx.string)(buffer, offset + uuidSize + skinSize + skin_nameSize)
      let { value: is_verified, size: is_verifiedSize } = (ctx.bool)(buffer, offset + uuidSize + skinSize + skin_nameSize + old_skin_nameSize)
      return { value: { uuid, skin, skin_name, old_skin_name, is_verified }, size: uuidSize + skinSize + skin_nameSize + old_skin_nameSize + is_verifiedSize}
    },
    packet_sub_client_login: (buffer, offset) => {
      return { value: {  }, size: 0}
    },
    packet_initiate_web_socket_connection: (buffer, offset) => {
      let { value: server, size: serverSize } = (ctx.string)(buffer, offset)
      return { value: { server }, size: serverSize}
    },
    packet_set_last_hurt_by: (buffer, offset) => {
      let { value: unknown, size: unknownSize } = (ctx.varint)(buffer, offset)
      return { value: { unknown }, size: unknownSize}
    },
    packet_book_edit: (buffer, offset) => {
      let { value: type, size: typeSize } = ((buffer, offset) => {
        const { value, size } = (ctx.u8)(buffer, offset)
        return { value: {"0":"replace_page","1":"add_page","2":"delete_page","3":"swap_pages","4":"sign"}[value] || value, size }
      })(buffer, offset)
      let { value: slot, size: slotSize } = (ctx.u8)(buffer, offset + typeSize)
      let { value: page_number, size: page_numberSize } = ((buffer, offset) => {
        switch (type) {
          case "replace_page": return (ctx.u8)(buffer, offset)
          case "add_page": return (ctx.u8)(buffer, offset)
          case "delete_page": return (ctx.u8)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + typeSize + slotSize)
      let { value: text, size: textSize } = ((buffer, offset) => {
        switch (type) {
          case "replace_page": return (ctx.string)(buffer, offset)
          case "add_page": return (ctx.string)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + typeSize + slotSize + page_numberSize)
      let { value: photo_name, size: photo_nameSize } = ((buffer, offset) => {
        switch (type) {
          case "replace_page": return (ctx.string)(buffer, offset)
          case "add_page": return (ctx.string)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + typeSize + slotSize + page_numberSize + textSize)
      let { value: page1, size: page1Size } = ((buffer, offset) => {
        switch (type) {
          case "swap_pages": return (ctx.u8)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + typeSize + slotSize + page_numberSize + textSize + photo_nameSize)
      let { value: page2, size: page2Size } = ((buffer, offset) => {
        switch (type) {
          case "swap_pages": return (ctx.u8)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + typeSize + slotSize + page_numberSize + textSize + photo_nameSize + page1Size)
      let { value: title, size: titleSize } = ((buffer, offset) => {
        switch (type) {
          case "sign": return (ctx.string)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + typeSize + slotSize + page_numberSize + textSize + photo_nameSize + page1Size + page2Size)
      let { value: author, size: authorSize } = ((buffer, offset) => {
        switch (type) {
          case "sign": return (ctx.string)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + typeSize + slotSize + page_numberSize + textSize + photo_nameSize + page1Size + page2Size + titleSize)
      let { value: xuid, size: xuidSize } = ((buffer, offset) => {
        switch (type) {
          case "sign": return (ctx.string)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + typeSize + slotSize + page_numberSize + textSize + photo_nameSize + page1Size + page2Size + titleSize + authorSize)
      return { value: { type, slot, page_number, text, photo_name, page1, page2, title, author, xuid }, size: typeSize + slotSize + page_numberSize + textSize + photo_nameSize + page1Size + page2Size + titleSize + authorSize + xuidSize}
    },
    packet_npc_request: (buffer, offset) => {
      let { value: runtime_entity_id, size: runtime_entity_idSize } = (ctx.varint)(buffer, offset)
      let { value: unknown0, size: unknown0Size } = (ctx.u8)(buffer, offset + runtime_entity_idSize)
      let { value: unknown1, size: unknown1Size } = (ctx.string)(buffer, offset + runtime_entity_idSize + unknown0Size)
      let { value: unknown2, size: unknown2Size } = (ctx.u8)(buffer, offset + runtime_entity_idSize + unknown0Size + unknown1Size)
      return { value: { runtime_entity_id, unknown0, unknown1, unknown2 }, size: runtime_entity_idSize + unknown0Size + unknown1Size + unknown2Size}
    },
    packet_photo_transfer: (buffer, offset) => {
      let { value: file_name, size: file_nameSize } = (ctx.string)(buffer, offset)
      let { value: image_data, size: image_dataSize } = (ctx.string)(buffer, offset + file_nameSize)
      let { value: unknown2, size: unknown2Size } = (ctx.string)(buffer, offset + file_nameSize + image_dataSize)
      return { value: { file_name, image_data, unknown2 }, size: file_nameSize + image_dataSize + unknown2Size}
    },
    packet_modal_form_request: (buffer, offset) => {
      let { value: form_id, size: form_idSize } = (ctx.varint)(buffer, offset)
      let { value: data, size: dataSize } = (ctx.string)(buffer, offset + form_idSize)
      return { value: { form_id, data }, size: form_idSize + dataSize}
    },
    packet_modal_form_response: (buffer, offset) => {
      let { value: form_id, size: form_idSize } = (ctx.varint)(buffer, offset)
      let { value: data, size: dataSize } = (ctx.string)(buffer, offset + form_idSize)
      return { value: { form_id, data }, size: form_idSize + dataSize}
    },
    packet_server_settings_request: (buffer, offset) => {
      return { value: {  }, size: 0}
    },
    packet_server_settings_response: (buffer, offset) => {
      let { value: form_id, size: form_idSize } = (ctx.varint)(buffer, offset)
      let { value: data, size: dataSize } = (ctx.string)(buffer, offset + form_idSize)
      return { value: { form_id, data }, size: form_idSize + dataSize}
    },
    packet_show_profile: (buffer, offset) => {
      let { value: xuid, size: xuidSize } = (ctx.string)(buffer, offset)
      return { value: { xuid }, size: xuidSize}
    },
    packet_set_default_game_type: (buffer, offset) => {
      let { value: gamemode, size: gamemodeSize } = (ctx.GameMode)(buffer, offset)
      return { value: { gamemode }, size: gamemodeSize}
    },
    packet_remove_objective: (buffer, offset) => {
      let { value: objective_name, size: objective_nameSize } = (ctx.string)(buffer, offset)
      return { value: { objective_name }, size: objective_nameSize}
    },
    packet_set_display_objective: (buffer, offset) => {
      let { value: display_slot, size: display_slotSize } = (ctx.string)(buffer, offset)
      let { value: objective_name, size: objective_nameSize } = (ctx.string)(buffer, offset + display_slotSize)
      let { value: display_name, size: display_nameSize } = (ctx.string)(buffer, offset + display_slotSize + objective_nameSize)
      let { value: criteria_name, size: criteria_nameSize } = (ctx.string)(buffer, offset + display_slotSize + objective_nameSize + display_nameSize)
      let { value: sort_order, size: sort_orderSize } = (ctx.zigzag32)(buffer, offset + display_slotSize + objective_nameSize + display_nameSize + criteria_nameSize)
      return { value: { display_slot, objective_name, display_name, criteria_name, sort_order }, size: display_slotSize + objective_nameSize + display_nameSize + criteria_nameSize + sort_orderSize}
    },
    packet_set_score: (buffer, offset) => {
      let { value: entries, size: entriesSize } = (ctx.ScoreEntries)(buffer, offset)
      return { value: { entries }, size: entriesSize}
    },
    packet_lab_table: (buffer, offset) => {
      let { value: useless_byte, size: useless_byteSize } = (ctx.u8)(buffer, offset)
      let { value: lab_table_x, size: lab_table_xSize } = (ctx.varint)(buffer, offset + useless_byteSize)
      let { value: lab_table_y, size: lab_table_ySize } = (ctx.varint)(buffer, offset + useless_byteSize + lab_table_xSize)
      let { value: lab_table_z, size: lab_table_zSize } = (ctx.varint)(buffer, offset + useless_byteSize + lab_table_xSize + lab_table_ySize)
      let { value: reaction_type, size: reaction_typeSize } = (ctx.u8)(buffer, offset + useless_byteSize + lab_table_xSize + lab_table_ySize + lab_table_zSize)
      return { value: { useless_byte, lab_table_x, lab_table_y, lab_table_z, reaction_type }, size: useless_byteSize + lab_table_xSize + lab_table_ySize + lab_table_zSize + reaction_typeSize}
    },
    packet_update_block_synced: (buffer, offset) => {
      let { value: coordinates, size: coordinatesSize } = (ctx.BlockCoordinates)(buffer, offset)
      let { value: block_runtime_id, size: block_runtime_idSize } = (ctx.varint)(buffer, offset + coordinatesSize)
      let { value: block_priority, size: block_prioritySize } = (ctx.varint)(buffer, offset + coordinatesSize + block_runtime_idSize)
      let { value: data_layer_id, size: data_layer_idSize } = (ctx.varint)(buffer, offset + coordinatesSize + block_runtime_idSize + block_prioritySize)
      let { value: unknown0, size: unknown0Size } = (ctx.varint)(buffer, offset + coordinatesSize + block_runtime_idSize + block_prioritySize + data_layer_idSize)
      let { value: unknown1, size: unknown1Size } = (ctx.varint)(buffer, offset + coordinatesSize + block_runtime_idSize + block_prioritySize + data_layer_idSize + unknown0Size)
      return { value: { coordinates, block_runtime_id, block_priority, data_layer_id, unknown0, unknown1 }, size: coordinatesSize + block_runtime_idSize + block_prioritySize + data_layer_idSize + unknown0Size + unknown1Size}
    },
    packet_move_entity_delta: (buffer, offset) => {
      let { value: runtime_entity_id, size: runtime_entity_idSize } = (ctx.varint64)(buffer, offset)
      let { value: flags, size: flagsSize } = (ctx.DeltaMoveFlags)(buffer, offset + runtime_entity_idSize)
      let { value: x, size: xSize } = ((buffer, offset) => {
        switch (flags.has_x) {
          case true: return (ctx.lf32)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + runtime_entity_idSize + flagsSize)
      let { value: y, size: ySize } = ((buffer, offset) => {
        switch (flags.has_y) {
          case true: return (ctx.lf32)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + runtime_entity_idSize + flagsSize + xSize)
      let { value: z, size: zSize } = ((buffer, offset) => {
        switch (flags.has_z) {
          case true: return (ctx.lf32)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + runtime_entity_idSize + flagsSize + xSize + ySize)
      let { value: rot_x, size: rot_xSize } = ((buffer, offset) => {
        switch (flags.has_rot_x) {
          case true: return (ctx.u8)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + runtime_entity_idSize + flagsSize + xSize + ySize + zSize)
      let { value: rot_y, size: rot_ySize } = ((buffer, offset) => {
        switch (flags.has_rot_y) {
          case true: return (ctx.u8)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + runtime_entity_idSize + flagsSize + xSize + ySize + zSize + rot_xSize)
      let { value: rot_z, size: rot_zSize } = ((buffer, offset) => {
        switch (flags.has_rot_z) {
          case true: return (ctx.u8)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + runtime_entity_idSize + flagsSize + xSize + ySize + zSize + rot_xSize + rot_ySize)
      return { value: { runtime_entity_id, flags, x, y, z, rot_x, rot_y, rot_z }, size: runtime_entity_idSize + flagsSize + xSize + ySize + zSize + rot_xSize + rot_ySize + rot_zSize}
    },
    packet_set_scoreboard_identity: (buffer, offset) => {
      let { value: entries, size: entriesSize } = (ctx.ScoreboardIdentityEntries)(buffer, offset)
      return { value: { entries }, size: entriesSize}
    },
    packet_set_local_player_as_initialized: (buffer, offset) => {
      let { value: runtime_entity_id, size: runtime_entity_idSize } = (ctx.varint64)(buffer, offset)
      return { value: { runtime_entity_id }, size: runtime_entity_idSize}
    },
    packet_update_soft_enum: (buffer, offset) => {
      return { value: {  }, size: 0}
    },
    packet_network_stack_latency: (buffer, offset) => {
      let { value: timestamp, size: timestampSize } = (ctx.lu64)(buffer, offset)
      let { value: unknown_flag, size: unknown_flagSize } = (ctx.u8)(buffer, offset + timestampSize)
      return { value: { timestamp, unknown_flag }, size: timestampSize + unknown_flagSize}
    },
    packet_script_custom_event: (buffer, offset) => {
      let { value: event_name, size: event_nameSize } = (ctx.string)(buffer, offset)
      let { value: event_data, size: event_dataSize } = (ctx.string)(buffer, offset + event_nameSize)
      return { value: { event_name, event_data }, size: event_nameSize + event_dataSize}
    },
    packet_spawn_particle_effect: (buffer, offset) => {
      let { value: dimension_id, size: dimension_idSize } = (ctx.u8)(buffer, offset)
      let { value: entity_id, size: entity_idSize } = (ctx.zigzag64)(buffer, offset + dimension_idSize)
      let { value: position, size: positionSize } = (ctx.vec3f)(buffer, offset + dimension_idSize + entity_idSize)
      let { value: particle_name, size: particle_nameSize } = (ctx.string)(buffer, offset + dimension_idSize + entity_idSize + positionSize)
      return { value: { dimension_id, entity_id, position, particle_name }, size: dimension_idSize + entity_idSize + positionSize + particle_nameSize}
    },
    packet_available_entity_identifiers: (buffer, offset) => {
      let { value: nbt, size: nbtSize } = (ctx.nbt)(buffer, offset)
      return { value: { nbt }, size: nbtSize}
    },
    packet_level_sound_event_v2: (buffer, offset) => {
      let { value: sound_id, size: sound_idSize } = (ctx.u8)(buffer, offset)
      let { value: position, size: positionSize } = (ctx.vec3f)(buffer, offset + sound_idSize)
      let { value: block_id, size: block_idSize } = (ctx.zigzag32)(buffer, offset + sound_idSize + positionSize)
      let { value: entity_type, size: entity_typeSize } = (ctx.string)(buffer, offset + sound_idSize + positionSize + block_idSize)
      let { value: is_baby_mob, size: is_baby_mobSize } = (ctx.bool)(buffer, offset + sound_idSize + positionSize + block_idSize + entity_typeSize)
      let { value: is_global, size: is_globalSize } = (ctx.bool)(buffer, offset + sound_idSize + positionSize + block_idSize + entity_typeSize + is_baby_mobSize)
      return { value: { sound_id, position, block_id, entity_type, is_baby_mob, is_global }, size: sound_idSize + positionSize + block_idSize + entity_typeSize + is_baby_mobSize + is_globalSize}
    },
    packet_network_chunk_publisher_update: (buffer, offset) => {
      let { value: coordinates, size: coordinatesSize } = (ctx.BlockCoordinates)(buffer, offset)
      let { value: radius, size: radiusSize } = (ctx.varint)(buffer, offset + coordinatesSize)
      return { value: { coordinates, radius }, size: coordinatesSize + radiusSize}
    },
    packet_biome_definition_list: (buffer, offset) => {
      let { value: nbt, size: nbtSize } = (ctx.nbt)(buffer, offset)
      return { value: { nbt }, size: nbtSize}
    },
    packet_level_sound_event: (buffer, offset) => {
      let { value: sound_id, size: sound_idSize } = (ctx.varint)(buffer, offset)
      let { value: position, size: positionSize } = (ctx.vec3f)(buffer, offset + sound_idSize)
      let { value: block_id, size: block_idSize } = (ctx.zigzag32)(buffer, offset + sound_idSize + positionSize)
      let { value: entity_type, size: entity_typeSize } = (ctx.string)(buffer, offset + sound_idSize + positionSize + block_idSize)
      let { value: is_baby_mob, size: is_baby_mobSize } = (ctx.bool)(buffer, offset + sound_idSize + positionSize + block_idSize + entity_typeSize)
      let { value: is_global, size: is_globalSize } = (ctx.bool)(buffer, offset + sound_idSize + positionSize + block_idSize + entity_typeSize + is_baby_mobSize)
      return { value: { sound_id, position, block_id, entity_type, is_baby_mob, is_global }, size: sound_idSize + positionSize + block_idSize + entity_typeSize + is_baby_mobSize + is_globalSize}
    },
    packet_level_event_generic: (buffer, offset) => {
      let { value: event_id, size: event_idSize } = (ctx.varint)(buffer, offset)
      let { value: nbt, size: nbtSize } = (ctx.nbtLoop)(buffer, offset + event_idSize)
      return { value: { event_id, nbt }, size: event_idSize + nbtSize}
    },
    packet_lectern_update: (buffer, offset) => {
      let { value: page, size: pageSize } = (ctx.u8)(buffer, offset)
      let { value: page_count, size: page_countSize } = (ctx.u8)(buffer, offset + pageSize)
      let { value: position, size: positionSize } = (ctx.vec3i)(buffer, offset + pageSize + page_countSize)
      let { value: drop_book, size: drop_bookSize } = (ctx.bool)(buffer, offset + pageSize + page_countSize + positionSize)
      return { value: { page, page_count, position, drop_book }, size: pageSize + page_countSize + positionSize + drop_bookSize}
    },
    packet_video_stream_connect: (buffer, offset) => {
      let { value: server_uri, size: server_uriSize } = (ctx.string)(buffer, offset)
      let { value: frame_send_frequency, size: frame_send_frequencySize } = (ctx.lf32)(buffer, offset + server_uriSize)
      let { value: action, size: actionSize } = (ctx.u8)(buffer, offset + server_uriSize + frame_send_frequencySize)
      let { value: resolution_x, size: resolution_xSize } = (ctx.li32)(buffer, offset + server_uriSize + frame_send_frequencySize + actionSize)
      let { value: resolution_y, size: resolution_ySize } = (ctx.li32)(buffer, offset + server_uriSize + frame_send_frequencySize + actionSize + resolution_xSize)
      return { value: { server_uri, frame_send_frequency, action, resolution_x, resolution_y }, size: server_uriSize + frame_send_frequencySize + actionSize + resolution_xSize + resolution_ySize}
    },
    packet_add_ecs_entity: (buffer, offset) => {
      let { value: network_id, size: network_idSize } = (ctx.varint64)(buffer, offset)
      return { value: { network_id }, size: network_idSize}
    },
    packet_remove_ecs_entity: (buffer, offset) => {
      let { value: network_id, size: network_idSize } = (ctx.varint64)(buffer, offset)
      return { value: { network_id }, size: network_idSize}
    },
    packet_client_cache_status: (buffer, offset) => {
      let { value: enabled, size: enabledSize } = (ctx.bool)(buffer, offset)
      return { value: { enabled }, size: enabledSize}
    },
    packet_on_screen_texture_animation: (buffer, offset) => {
      return { value: {  }, size: 0}
    },
    packet_map_create_locked_copy: (buffer, offset) => {
      return { value: {  }, size: 0}
    },
    packet_structure_template_data_export_request: (buffer, offset) => {
      return { value: {  }, size: 0}
    },
    packet_structure_template_data_export_response: (buffer, offset) => {
      return { value: {  }, size: 0}
    },
    packet_update_block_properties: (buffer, offset) => {
      let { value: nbt, size: nbtSize } = (ctx.nbt)(buffer, offset)
      return { value: { nbt }, size: nbtSize}
    },
    packet_client_cache_blob_status: (buffer, offset) => {
      let { value: misses, size: missesSize } = (ctx.varint)(buffer, offset)
      let { value: haves, size: havesSize } = (ctx.varint)(buffer, offset + missesSize)
      let { value: missing, size: missingSize } = ((buffer, offset) => {
        const count = misses
        const countSize = 0
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = (ctx.lu64)(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset + missesSize + havesSize)
      let { value: have, size: haveSize } = ((buffer, offset) => {
        const count = haves
        const countSize = 0
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = (ctx.lu64)(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset + missesSize + havesSize + missingSize)
      return { value: { misses, haves, missing, have }, size: missesSize + havesSize + missingSize + haveSize}
    },
    packet_client_cache_miss_response: (buffer, offset) => {
      let { value: blobs, size: blobsSize } = ((buffer, offset) => {
        const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = (ctx.Blob)(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset)
      return { value: { blobs }, size: blobsSize}
    },
    packet_education_settings: (buffer, offset) => {
      let { value: CodeBuilderDefaultURI, size: CodeBuilderDefaultURISize } = (ctx.string)(buffer, offset)
      let { value: CodeBuilderTitle, size: CodeBuilderTitleSize } = (ctx.string)(buffer, offset + CodeBuilderDefaultURISize)
      let { value: CanResizeCodeBuilder, size: CanResizeCodeBuilderSize } = (ctx.bool)(buffer, offset + CodeBuilderDefaultURISize + CodeBuilderTitleSize)
      let { value: HasOverrideURI, size: HasOverrideURISize } = (ctx.bool)(buffer, offset + CodeBuilderDefaultURISize + CodeBuilderTitleSize + CanResizeCodeBuilderSize)
      let { value: OverrideURI, size: OverrideURISize } = ((buffer, offset) => {
        switch (HasOverrideURI) {
          case true: return (ctx.string)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + CodeBuilderDefaultURISize + CodeBuilderTitleSize + CanResizeCodeBuilderSize + HasOverrideURISize)
      let { value: HasQuiz, size: HasQuizSize } = (ctx.bool)(buffer, offset + CodeBuilderDefaultURISize + CodeBuilderTitleSize + CanResizeCodeBuilderSize + HasOverrideURISize + OverrideURISize)
      return { value: { CodeBuilderDefaultURI, CodeBuilderTitle, CanResizeCodeBuilder, HasOverrideURI, OverrideURI, HasQuiz }, size: CodeBuilderDefaultURISize + CodeBuilderTitleSize + CanResizeCodeBuilderSize + HasOverrideURISize + OverrideURISize + HasQuizSize}
    },
    packet_multiplayer_settings: (buffer, offset) => {
      let { value: action_type, size: action_typeSize } = ((buffer, offset) => {
        const { value, size } = (ctx.zigzag32)(buffer, offset)
        return { value: {"0":"enable_multiplayer","1":"disable_multiplayer","2":"refresh_join_code"}[value] || value, size }
      })(buffer, offset)
      return { value: { action_type }, size: action_typeSize}
    },
    packet_settings_command: (buffer, offset) => {
      let { value: command_line, size: command_lineSize } = (ctx.string)(buffer, offset)
      let { value: suppress_output, size: suppress_outputSize } = (ctx.bool)(buffer, offset + command_lineSize)
      return { value: { command_line, suppress_output }, size: command_lineSize + suppress_outputSize}
    },
    packet_anvil_damage: (buffer, offset) => {
      let { value: damage, size: damageSize } = (ctx.u8)(buffer, offset)
      let { value: position, size: positionSize } = (ctx.BlockCoordinates)(buffer, offset + damageSize)
      return { value: { damage, position }, size: damageSize + positionSize}
    },
    packet_completed_using_item: (buffer, offset) => {
      let { value: used_item_id, size: used_item_idSize } = (ctx.li16)(buffer, offset)
      let { value: use_method, size: use_methodSize } = ((buffer, offset) => {
        const { value, size } = (ctx.li32)(buffer, offset)
        return { value: {"0":"equip_armor","1":"eat","2":"attack","3":"consume","4":"throw","5":"shoot","6":"place","7":"fill_bottle","8":"fill_bucket","9":"pour_bucket","10":"use_tool","11":"interact","12":"retrieved","13":"dyed","14":"traded"}[value] || value, size }
      })(buffer, offset + used_item_idSize)
      return { value: { used_item_id, use_method }, size: used_item_idSize + use_methodSize}
    },
    packet_network_settings: (buffer, offset) => {
      let { value: compression_threshold, size: compression_thresholdSize } = (ctx.u16)(buffer, offset)
      return { value: { compression_threshold }, size: compression_thresholdSize}
    },
    packet_player_auth_input: (buffer, offset) => {
      let { value: pitch, size: pitchSize } = (ctx.lf32)(buffer, offset)
      let { value: yaw, size: yawSize } = (ctx.lf32)(buffer, offset + pitchSize)
      let { value: position, size: positionSize } = (ctx.vec3f)(buffer, offset + pitchSize + yawSize)
      let { value: move_vector, size: move_vectorSize } = (ctx.vec2f)(buffer, offset + pitchSize + yawSize + positionSize)
      let { value: head_yaw, size: head_yawSize } = (ctx.lf32)(buffer, offset + pitchSize + yawSize + positionSize + move_vectorSize)
      let { value: input_data, size: input_dataSize } = (ctx.InputFlag)(buffer, offset + pitchSize + yawSize + positionSize + move_vectorSize + head_yawSize)
      let { value: input_mode, size: input_modeSize } = ((buffer, offset) => {
        const { value, size } = (ctx.varint)(buffer, offset)
        return { value: {"0":"mouse","1":"touch","2":"game_pad","3":"motion_controller"}[value] || value, size }
      })(buffer, offset + pitchSize + yawSize + positionSize + move_vectorSize + head_yawSize + input_dataSize)
      let { value: play_mode, size: play_modeSize } = ((buffer, offset) => {
        const { value, size } = (ctx.varint)(buffer, offset)
        return { value: {"0":"normal","1":"teaser","2":"screen","3":"viewer","4":"reality","5":"placement","6":"living_room","7":"exit_level","8":"exit_level_living_room","9":"num_modes"}[value] || value, size }
      })(buffer, offset + pitchSize + yawSize + positionSize + move_vectorSize + head_yawSize + input_dataSize + input_modeSize)
      let { value: gaze_direction, size: gaze_directionSize } = ((buffer, offset) => {
        switch (play_mode) {
          case "reality": return (ctx.vec3f)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + pitchSize + yawSize + positionSize + move_vectorSize + head_yawSize + input_dataSize + input_modeSize + play_modeSize)
      let { value: tick, size: tickSize } = (ctx.varint64)(buffer, offset + pitchSize + yawSize + positionSize + move_vectorSize + head_yawSize + input_dataSize + input_modeSize + play_modeSize + gaze_directionSize)
      let { value: delta, size: deltaSize } = (ctx.vec3f)(buffer, offset + pitchSize + yawSize + positionSize + move_vectorSize + head_yawSize + input_dataSize + input_modeSize + play_modeSize + gaze_directionSize + tickSize)
      return { value: { pitch, yaw, position, move_vector, head_yaw, input_data, input_mode, play_mode, gaze_direction, tick, delta }, size: pitchSize + yawSize + positionSize + move_vectorSize + head_yawSize + input_dataSize + input_modeSize + play_modeSize + gaze_directionSize + tickSize + deltaSize}
    },
    packet_creative_content: (buffer, offset) => {
      let { value: items, size: itemsSize } = (ctx.ItemStacks)(buffer, offset)
      return { value: { items }, size: itemsSize}
    },
    packet_player_enchant_options: (buffer, offset) => {
      let { value: enchant_options, size: enchant_optionsSize } = (ctx.EnchantOptions)(buffer, offset)
      return { value: { enchant_options }, size: enchant_optionsSize}
    },
    packet_item_stack_request: (buffer, offset) => {
      let { value: requests, size: requestsSize } = (ctx.ItemStackRequests)(buffer, offset)
      return { value: { requests }, size: requestsSize}
    },
    packet_item_stack_response: (buffer, offset) => {
      let { value: responses, size: responsesSize } = (ctx.ItemStackResponses)(buffer, offset)
      return { value: { responses }, size: responsesSize}
    },
    packet_player_armor_damage: (buffer, offset) => {
      let { value: type, size: typeSize } = (ctx.ArmorDamageType)(buffer, offset)
      let { value: helmet_damage, size: helmet_damageSize } = ((buffer, offset) => {
        switch (type.head) {
          case true: return (ctx.zigzag32)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + typeSize)
      let { value: chestplate_damage, size: chestplate_damageSize } = ((buffer, offset) => {
        switch (type.chest) {
          case true: return (ctx.zigzag32)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + typeSize + helmet_damageSize)
      let { value: leggings_damage, size: leggings_damageSize } = ((buffer, offset) => {
        switch (type.legs) {
          case true: return (ctx.zigzag32)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + typeSize + helmet_damageSize + chestplate_damageSize)
      let { value: boots_damage, size: boots_damageSize } = ((buffer, offset) => {
        switch (types.feet) {
          case true: return (ctx.zigzag32)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + typeSize + helmet_damageSize + chestplate_damageSize + leggings_damageSize)
      return { value: { type, helmet_damage, chestplate_damage, leggings_damage, boots_damage }, size: typeSize + helmet_damageSize + chestplate_damageSize + leggings_damageSize + boots_damageSize}
    },
    packet_update_player_game_type: (buffer, offset) => {
      let { value: gamemode, size: gamemodeSize } = (ctx.GameMode)(buffer, offset)
      let { value: player_unique_id, size: player_unique_idSize } = (ctx.zigzag64)(buffer, offset + gamemodeSize)
      return { value: { gamemode, player_unique_id }, size: gamemodeSize + player_unique_idSize}
    },
    packet_position_tracking_db_request: (buffer, offset) => {
      let { value: action, size: actionSize } = ((buffer, offset) => {
        const { value, size } = (ctx.u8)(buffer, offset)
        return { value: {"0":"query"}[value] || value, size }
      })(buffer, offset)
      let { value: tracking_id, size: tracking_idSize } = (ctx.zigzag32)(buffer, offset + actionSize)
      return { value: { action, tracking_id }, size: actionSize + tracking_idSize}
    },
    packet_position_tracking_db_broadcast: (buffer, offset) => {
      let { value: broadcast_action, size: broadcast_actionSize } = ((buffer, offset) => {
        const { value, size } = (ctx.u8)(buffer, offset)
        return { value: {"0":"update","1":"destory","2":"not_found"}[value] || value, size }
      })(buffer, offset)
      let { value: tracking_id, size: tracking_idSize } = (ctx.zigzag32)(buffer, offset + broadcast_actionSize)
      let { value: nbt, size: nbtSize } = (ctx.nbt)(buffer, offset + broadcast_actionSize + tracking_idSize)
      return { value: { broadcast_action, tracking_id, nbt }, size: broadcast_actionSize + tracking_idSize + nbtSize}
    },
    packet_packet_violation_warning: (buffer, offset) => {
      let { value: violation_type, size: violation_typeSize } = ((buffer, offset) => {
        const { value, size } = (ctx.zigzag32)(buffer, offset)
        return { value: {"0":"malformed"}[value] || value, size }
      })(buffer, offset)
      let { value: severity, size: severitySize } = ((buffer, offset) => {
        const { value, size } = (ctx.zigzag32)(buffer, offset)
        return { value: {"0":"warning","1":"final_warning","2":"terminating"}[value] || value, size }
      })(buffer, offset + violation_typeSize)
      let { value: packet_id, size: packet_idSize } = (ctx.zigzag32)(buffer, offset + violation_typeSize + severitySize)
      let { value: reason, size: reasonSize } = (ctx.string)(buffer, offset + violation_typeSize + severitySize + packet_idSize)
      return { value: { violation_type, severity, packet_id, reason }, size: violation_typeSize + severitySize + packet_idSize + reasonSize}
    },
    packet_motion_prediction_hints: (buffer, offset) => {
      let { value: entity_runtime_id, size: entity_runtime_idSize } = (ctx.varint64)(buffer, offset)
      let { value: velocity, size: velocitySize } = (ctx.vec3f)(buffer, offset + entity_runtime_idSize)
      let { value: on_ground, size: on_groundSize } = (ctx.bool)(buffer, offset + entity_runtime_idSize + velocitySize)
      return { value: { entity_runtime_id, velocity, on_ground }, size: entity_runtime_idSize + velocitySize + on_groundSize}
    },
    packet_animate_entity: (buffer, offset) => {
      let { value: animation, size: animationSize } = (ctx.string)(buffer, offset)
      let { value: next_state, size: next_stateSize } = (ctx.string)(buffer, offset + animationSize)
      let { value: stop_condition, size: stop_conditionSize } = (ctx.string)(buffer, offset + animationSize + next_stateSize)
      let { value: controller, size: controllerSize } = (ctx.string)(buffer, offset + animationSize + next_stateSize + stop_conditionSize)
      let { value: blend_out_time, size: blend_out_timeSize } = (ctx.lf32)(buffer, offset + animationSize + next_stateSize + stop_conditionSize + controllerSize)
      let { value: runtime_entity_ids, size: runtime_entity_idsSize } = ((buffer, offset) => {
        const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = (ctx.varint64)(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset + animationSize + next_stateSize + stop_conditionSize + controllerSize + blend_out_timeSize)
      return { value: { animation, next_state, stop_condition, controller, blend_out_time, runtime_entity_ids }, size: animationSize + next_stateSize + stop_conditionSize + controllerSize + blend_out_timeSize + runtime_entity_idsSize}
    },
    packet_camera_shake: (buffer, offset) => {
      let { value: intensity, size: intensitySize } = (ctx.lf32)(buffer, offset)
      let { value: duration, size: durationSize } = (ctx.lf32)(buffer, offset + intensitySize)
      let { value: type, size: typeSize } = (ctx.u8)(buffer, offset + intensitySize + durationSize)
      return { value: { intensity, duration, type }, size: intensitySize + durationSize + typeSize}
    },
    packet_player_fog: (buffer, offset) => {
      let { value: stack, size: stackSize } = ((buffer, offset) => {
        const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = (ctx.string)(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset)
      return { value: { stack }, size: stackSize}
    },
    packet_correct_player_move_prediction: (buffer, offset) => {
      let { value: position, size: positionSize } = (ctx.vec3f)(buffer, offset)
      let { value: delta, size: deltaSize } = (ctx.vec3f)(buffer, offset + positionSize)
      let { value: on_ground, size: on_groundSize } = (ctx.bool)(buffer, offset + positionSize + deltaSize)
      let { value: tick, size: tickSize } = (ctx.varint64)(buffer, offset + positionSize + deltaSize + on_groundSize)
      return { value: { position, delta, on_ground, tick }, size: positionSize + deltaSize + on_groundSize + tickSize}
    },
    packet_item_component: (buffer, offset) => {
      let { value: entries, size: entriesSize } = (ctx.ItemComponentList)(buffer, offset)
      return { value: { entries }, size: entriesSize}
    },
    packet_filter_text_packet: (buffer, offset) => {
      let { value: text, size: textSize } = (ctx.string)(buffer, offset)
      let { value: from_server, size: from_serverSize } = (ctx.bool)(buffer, offset + textSize)
      return { value: { text, from_server }, size: textSize + from_serverSize}
    },
    string: (buffer, offset) => {
      const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
      offset += countSize
      if (offset + count > buffer.length) {
        throw new PartialReadError("Missing characters in string, found size is " + buffer.length + " expected size was " + (offset + count))
      }
      return { value: buffer.toString('utf8', offset, offset + count), size: count + countSize }
    },
    ByteArray: (buffer, offset) => {
      const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
      offset += countSize
      if (offset + count > buffer.length) {
        throw new PartialReadError()
      }
      return { value: buffer.slice(offset, offset + count), size: count + countSize }
    },
    SignedByteArray: (buffer, offset) => {
      const { value: count, size: countSize } = (ctx.zigzag32)(buffer, offset)
      offset += countSize
      if (offset + count > buffer.length) {
        throw new PartialReadError()
      }
      return { value: buffer.slice(offset, offset + count), size: count + countSize }
    },
    LittleString: (buffer, offset) => {
      const { value: count, size: countSize } = (ctx.li32)(buffer, offset)
      offset += countSize
      if (offset + count > buffer.length) {
        throw new PartialReadError("Missing characters in string, found size is " + buffer.length + " expected size was " + (offset + count))
      }
      return { value: buffer.toString('utf8', offset, offset + count), size: count + countSize }
    },
    AdventureFlags: (buffer, offset) => {
      const { value: _value, size } = (ctx.varint)(buffer, offset)
          const value = { _value }
          const flags = {"world_immutable":1,"no_pvp":2,"auto_jump":32,"allow_flight":64,"no_clip":128,"world_builder":256,"flying":512,"muted":1024}
          for (const key in flags) {
            value[key] = (_value & flags[key]) == flags[key]
          }
          return { value, size }
    },
    ActionPermissions: (buffer, offset) => {
      const { value: _value, size } = (ctx.varint)(buffer, offset)
          const value = { _value }
          const flags = {"build_and_mine":65537,"doors_and_switches":65538,"open_containers":65540,"attack_players":65544,"attack_mobs":65552,"operator":65568,"teleport":65664}
          for (const key in flags) {
            value[key] = (_value & flags[key]) == flags[key]
          }
          return { value, size }
    },
    CommandFlags: (buffer, offset) => {
      if ( offset + 1 > buffer.length) { throw new PartialReadError() }
      let bits = buffer[offset++]
      let unused = (bits >> 2) & 0x3f
      let has_semantic_constraint = (bits >> 1) & 0x1
      let collapse_enum = (bits >> 0) & 0x1
      return { value: { unused, has_semantic_constraint, collapse_enum }, size: 1 }
    },
    DeltaMoveFlags: (buffer, offset) => {
      const { value: _value, size } = (ctx.lu16)(buffer, offset)
          const value = { _value }
          const flags = {"has_x":1,"has_y":2,"has_z":4,"has_rot_x":8,"has_rot_y":16,"has_rot_z":32,"on_ground":64,"teleport":128,"force_move":256}
          for (const key in flags) {
            value[key] = (_value & flags[key]) == flags[key]
          }
          return { value, size }
    },
    InputFlag: (buffer, offset) => {
      const { value: _value, size } = (ctx.varint)(buffer, offset)
          const value = { _value }
          const flags = {"ascend":1,"descend":2,"north_jump":4,"jump_down":8,"sprint_down":16,"change_height":32,"jumping":64,"auto_jumping_in_water":128,"sneaking":256,"sneak_down":512,"up":1024,"down":2048,"left":4096,"right":8192,"up_left":16384,"up_right":32768,"want_up":65536,"want_down":131072,"want_down_slow":262144,"want_up_slow":524288,"sprinting":1048576,"ascend_scaffolding":2097152,"descend_scaffolding":4194304,"sneak_toggle_down":8388608,"persist_sneak":16777216}
          for (const key in flags) {
            value[key] = (_value & flags[key]) == flags[key]
          }
          return { value, size }
    },
    ArmorDamageType: (buffer, offset) => {
      const { value: _value, size } = (ctx.u8)(buffer, offset)
          const value = { _value }
          const flags = {"head":1,"chest":2,"legs":4,"feet":8}
          for (const key in flags) {
            value[key] = (_value & flags[key]) == flags[key]
          }
          return { value, size }
    }
  }
  return ctx
}